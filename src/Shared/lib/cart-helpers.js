const createCartKey = ({ productId, size, color }) =>
    [productId, size || "default", color || "default"].join(":");

const addCartItem = (prevItems, payload) => {
    const key = createCartKey(payload);
    const existingItem = prevItems.find((item) => item.key === key);
    const quantityToAdd = Number(payload.quantity) || 1;

    if (existingItem) {
        return prevItems.map((item) =>
            item.key === key
                ? { ...item, quantity: item.quantity + quantityToAdd }
                : item
        );
    }

    return [
        ...prevItems,
        {
            key,
            productId: payload.productId,
            name: payload.name,
            image: payload.image,
            price: payload.price,
            size: payload.size || null,
            color: payload.color || null,
            quantity: quantityToAdd,
        },
    ];
};

const removeCartItem = (prevItems, key) =>
    prevItems.filter((item) => item.key !== key);

const updateCartItemQuantity = (prevItems, key, quantity) => {
    if (quantity <= 0) {
        return removeCartItem(prevItems, key);
    }

    return prevItems.map((item) =>
        item.key === key ? { ...item, quantity } : item
    );
};

const getCartTotals = (items) => ({
    itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
});

export {
    addCartItem,
    createCartKey,
    getCartTotals,
    removeCartItem,
    updateCartItemQuantity,
};
