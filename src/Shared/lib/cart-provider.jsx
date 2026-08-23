import { useCallback, useEffect, useMemo, useState } from "react";

import { readAmount } from "./amount";
import { CartContext } from "./cart-context";
import { resolveRegionId, sdk } from "./medusa";
import { useAuth } from "./use-auth";
const CART_STORAGE_KEY = "teoo-shop-cart-id";

const readStoredCartId = () => {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        return window.localStorage.getItem(CART_STORAGE_KEY);
    } catch {
        return null;
    }
};

const writeStoredCartId = (cartId) => {
    if (typeof window === "undefined") {
        return;
    }

    try {
        if (cartId) {
            window.localStorage.setItem(CART_STORAGE_KEY, cartId);
        } else {
            window.localStorage.removeItem(CART_STORAGE_KEY);
        }
    } catch {
        // Ignore localStorage write failures and continue with in-memory cart state.
    }
};

// Selected option values are stashed in the line item's metadata at add-to-cart
// time (see `addItem` below) since that's the most reliable source — the cart
// response's `variant.options` isn't always expanded. Fall back to it anyway
// for line items that predate this metadata (or came in some other way).
const readOptions = (item) =>
    item?.metadata?.options ||
    (item?.variant?.options || []).map((option) => ({
        title: option?.option?.title || "",
        value: option?.value || "",
    }));

const mapCartItem = (item) => {
    const options = readOptions(item);

    return {
        id: item?.id,
        lineId: item?.id,
        variantId: item?.variant_id || item?.variant?.id || null,
        image: item?.thumbnail || item?.variant?.product?.thumbnail || "",
        name: item?.product_title || item?.title || "",
        options,
        optionsLabel: options
            .map((option) => option.value)
            .filter(Boolean)
            .join(" · "),
        price: readAmount(item?.unit_price),
        quantity: readAmount(item?.quantity) || 1,
    };
};

const normalizeCart = (cart) => {
    const items = (cart?.items || []).map(mapCartItem);
    // `cart.subtotal` includes the shipping total once a shipping method is
    // attached, so the items-only figure has to come from `item_total`.
    const itemTotal = readAmount(cart?.item_total ?? cart?.subtotal);
    const totalPrice =
        itemTotal ||
        items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
        cart,
        items,
        itemCount,
        totalPrice,
    };
};

const CartProvider = ({ children }) => {
    const { customer, isAuthenticated } = useAuth();
    const [cartState, setCartState] = useState({
        cart: null,
        items: [],
        itemCount: 0,
        totalPrice: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const syncCart = useCallback((cart) => {
        writeStoredCartId(cart?.id || null);
        setCartState(normalizeCart(cart));
    }, []);

    const createCart = useCallback(async () => {
        const regionId = await resolveRegionId();
        const { cart } = await sdk.store.cart.create({
            region_id: regionId,
        });

        syncCart(cart);
        return cart;
    }, [syncCart]);

    const ensureCart = useCallback(async () => {
        if (cartState.cart?.id) {
            return cartState.cart;
        }

        const storedCartId = readStoredCartId();

        if (storedCartId) {
            try {
                const { cart } = await sdk.store.cart.retrieve(storedCartId);
                syncCart(cart);
                return cart;
            } catch {
                writeStoredCartId(null);
            }
        }

        return createCart();
    }, [cartState.cart, createCart, syncCart]);

    useEffect(() => {
        let isMounted = true;

        const bootstrapCart = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const storedCartId = readStoredCartId();

                if (storedCartId) {
                    const { cart } = await sdk.store.cart.retrieve(storedCartId);

                    if (isMounted) {
                        syncCart(cart);
                    }
                } else {
                    await createCart();
                }
            } catch {
                try {
                    await createCart();
                } catch {
                    if (isMounted) {
                        setError("Could not load cart");
                    }
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        bootstrapCart();

        return () => {
            isMounted = false;
        };
    }, [createCart, syncCart]);

    // A cart created while browsing as a guest stays a guest cart forever
    // unless explicitly handed over — Medusa attributes the eventual order to
    // whoever `cart.customer_id` says, not to whoever is logged in at
    // checkout. So once login/registration resolves, claim the current cart
    // for that customer. `cart.customer_id` on the synced cart is the guard
    // against re-sending this after it already succeeded.
    useEffect(() => {
        const cartId = cartState.cart?.id;

        if (!isAuthenticated || !customer?.id || !cartId) {
            return;
        }

        if (cartState.cart.customer_id === customer.id) {
            return;
        }

        sdk.store.cart
            .transferCart(cartId)
            .then(({ cart }) => syncCart(cart))
            .catch(() => {});
    }, [customer, isAuthenticated, cartState.cart, syncCart]);

    const runCartMutation = useCallback(
        async (mutation) => {
            setIsUpdating(true);
            setError(null);

            try {
                const activeCart = await ensureCart();
                const response = await mutation(activeCart);
                const nextCart = response?.cart || response?.parent || null;

                if (nextCart) {
                    syncCart(nextCart);
                }

                return nextCart;
            } catch {
                setError("Could not update cart");
                return null;
            } finally {
                setIsUpdating(false);
            }
        },
        [ensureCart, syncCart]
    );

    const addItem = useCallback(
        async ({ options = [], quantity = 1, variantId }) => {
            if (!variantId) {
                throw new Error("variantId is required");
            }

            const existingItem = cartState.items.find(
                (item) => item.variantId === variantId
            );

            if (existingItem) {
                return runCartMutation((cart) =>
                    sdk.store.cart.updateLineItem(cart.id, existingItem.lineId, {
                        quantity: existingItem.quantity + quantity,
                    })
                );
            }

            return runCartMutation((cart) =>
                sdk.store.cart.createLineItem(cart.id, {
                    variant_id: variantId,
                    quantity,
                    metadata: options.length ? { options } : {},
                })
            );
        },
        [cartState.items, runCartMutation]
    );

    const removeItem = useCallback(
        async (lineItemId) => {
            if (!lineItemId) {
                return null;
            }

            return runCartMutation((cart) =>
                sdk.store.cart.deleteLineItem(cart.id, lineItemId)
            );
        },
        [runCartMutation]
    );

    const setItemQuantity = useCallback(
        async (lineItemId, quantity) => {
            if (!lineItemId) {
                return null;
            }

            if (quantity <= 0) {
                return removeItem(lineItemId);
            }

            return runCartMutation((cart) =>
                sdk.store.cart.updateLineItem(cart.id, lineItemId, {
                    quantity,
                })
            );
        },
        [removeItem, runCartMutation]
    );

    const clearCart = useCallback(async () => {
        if (cartState.items.length === 0) {
            return null;
        }

        return runCartMutation(async (cart) => {
            // Each line item is independent, so delete them concurrently
            // instead of awaiting one round-trip at a time, then re-fetch
            // once for a state guaranteed to reflect every removal.
            await Promise.all(
                cartState.items.map((item) => sdk.store.cart.deleteLineItem(cart.id, item.lineId))
            );

            return sdk.store.cart.retrieve(cart.id);
        });
    }, [cartState.items, runCartMutation]);

    const isInCart = useCallback(
        ({ variantId }) => {
            if (!variantId) {
                return false;
            }

            return cartState.items.some((item) => item.variantId === variantId);
        },
        [cartState.items]
    );

    const updateCheckoutInfo = useCallback(
        async ({ billingAddress, email, shippingAddress }) => {
            return runCartMutation((cart) =>
                sdk.store.cart.update(cart.id, {
                    email,
                    shipping_address: shippingAddress,
                    billing_address: billingAddress || shippingAddress,
                })
            );
        },
        [runCartMutation]
    );

    const setShippingMethod = useCallback(
        async (optionId, data) => {
            return runCartMutation((cart) =>
                sdk.store.cart.addShippingMethod(cart.id, {
                    option_id: optionId,
                    ...(data ? { data } : {}),
                })
            );
        },
        [runCartMutation]
    );

    const mutatePromotion = useCallback(
        async (code, method) => {
            return runCartMutation((cart) =>
                sdk.client.fetch(`/store/carts/${cart.id}/promotions`, {
                    method,
                    body: { promo_codes: [code] },
                })
            );
        },
        [runCartMutation]
    );

    const applyPromotion = useCallback(
        (code) => mutatePromotion(code, "POST"),
        [mutatePromotion]
    );

    const removePromotion = useCallback(
        (code) => mutatePromotion(code, "DELETE"),
        [mutatePromotion]
    );

    const initiatePaymentSession = useCallback(
        async (providerId) => {
            setIsUpdating(true);
            setError(null);

            try {
                const activeCart = await ensureCart();
                const { payment_collection } = await sdk.store.payment.initiatePaymentSession(
                    activeCart,
                    { provider_id: providerId }
                );

                syncCart({ ...activeCart, payment_collection });
                return payment_collection;
            } catch {
                setError("Could not start payment");
                return null;
            } finally {
                setIsUpdating(false);
            }
        },
        [ensureCart, syncCart]
    );

    // Forgets the local cart reference without touching it server-side — used
    // after an order is placed, and after logout/account deletion so the next
    // session (a different customer, or a guest) doesn't inherit this cart.
    const resetCart = useCallback(() => {
        writeStoredCartId(null);
        setCartState({ cart: null, items: [], itemCount: 0, totalPrice: 0 });
    }, []);

    const completeCart = useCallback(async () => {
        setIsUpdating(true);
        setError(null);

        try {
            const activeCart = await ensureCart();
            const data = await sdk.store.cart.complete(activeCart.id);

            if (data.type === "order") {
                resetCart();
                return { order: data.order };
            }

            syncCart(data.cart);
            return { error: data.error?.message || "Could not place the order" };
        } catch {
            setError("Could not place the order");
            return { error: "Could not place the order" };
        } finally {
            setIsUpdating(false);
        }
    }, [ensureCart, resetCart, syncCart]);

    const value = useMemo(
        () => ({
            ...cartState,
            addItem,
            applyPromotion,
            clearCart,
            completeCart,
            error,
            initiatePaymentSession,
            isInCart,
            isLoading,
            isUpdating,
            removeItem,
            removePromotion,
            resetCart,
            setItemQuantity,
            setShippingMethod,
            updateCheckoutInfo,
        }),
        [
            addItem,
            applyPromotion,
            cartState,
            clearCart,
            completeCart,
            error,
            initiatePaymentSession,
            isInCart,
            isLoading,
            isUpdating,
            removeItem,
            removePromotion,
            resetCart,
            setItemQuantity,
            setShippingMethod,
            updateCheckoutInfo,
        ]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider };
