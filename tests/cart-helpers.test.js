import assert from "node:assert/strict";
import test from "node:test";

import {
    addCartItem,
    createCartKey,
    getCartTotals,
    removeCartItem,
    updateCartItemQuantity,
} from "../src/Shared/lib/cart-helpers.js";

const basePayload = {
    productId: 1,
    name: "Classic Tee",
    image: "image.jpg",
    price: 750,
    size: "M",
    color: "#fff",
    quantity: 1,
};

test("createCartKey builds stable key with variants", () => {
    assert.equal(createCartKey(basePayload), "1:M:#fff");
    assert.equal(createCartKey({ productId: 1 }), "1:default:default");
});

test("addCartItem merges same variant and increases quantity", () => {
    const first = addCartItem([], basePayload);
    const second = addCartItem(first, basePayload);

    assert.equal(second.length, 1);
    assert.equal(second[0].quantity, 2);
});

test("removeCartItem deletes item by key", () => {
    const items = addCartItem([], basePayload);
    const result = removeCartItem(items, "1:M:#fff");

    assert.equal(result.length, 0);
});

test("updateCartItemQuantity changes or removes item", () => {
    const items = addCartItem([], basePayload);
    const updated = updateCartItemQuantity(items, "1:M:#fff", 4);

    assert.equal(updated[0].quantity, 4);

    const removed = updateCartItemQuantity(updated, "1:M:#fff", 0);
    assert.equal(removed.length, 0);
});

test("getCartTotals returns total quantity and price", () => {
    const items = [
        {
            key: "1:M:#fff",
            quantity: 2,
            price: 750,
        },
        {
            key: "2:L:#000",
            quantity: 1,
            price: 890,
        },
    ];

    const totals = getCartTotals(items);

    assert.equal(totals.itemCount, 3);
    assert.equal(totals.totalPrice, 2390);
});
