import { useEffect, useState } from "react";

import {
    addCartItem,
    createCartKey,
    getCartTotals,
    removeCartItem,
    updateCartItemQuantity,
} from "./cart-helpers";
import { CartContext } from "./cart-context";

const CART_STORAGE_KEY = "teoo-shop-cart";

const loadInitialCart = () => {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    } catch {
        return [];
    }
};

const CartProvider = ({ children }) => {
    const [items, setItems] = useState(loadInitialCart);

    useEffect(() => {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = (payload) => {
        setItems((prevItems) => addCartItem(prevItems, payload));
    };

    const removeItem = (key) => {
        setItems((prevItems) => removeCartItem(prevItems, key));
    };

    const setItemQuantity = (key, quantity) => {
        setItems((prevItems) =>
            updateCartItemQuantity(prevItems, key, quantity)
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const isInCart = (product) => {
        const key = createCartKey(product);
        return items.some((item) => item.key === key);
    };

    const { itemCount, totalPrice } = getCartTotals(items);

    const value = {
        items,
        itemCount,
        totalPrice,
        addItem,
        removeItem,
        setItemQuantity,
        clearCart,
        isInCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider };
