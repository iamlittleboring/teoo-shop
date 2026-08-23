import { readAmount } from "./amount";
import { sdk } from "./medusa";

const ORDER_LIST_FIELDS = [
    "id",
    "display_id",
    "status",
    "fulfillment_status",
    "payment_status",
    "total",
    "currency_code",
    "created_at",
    "items.id",
    "items.title",
    "items.product_title",
    "items.thumbnail",
    "items.variant_title",
    "items.quantity",
    "items.unit_price",
].join(",");

const mapOrderItem = (item) => ({
    id: item?.id,
    image: item?.thumbnail || "",
    name: item?.product_title || item?.title || "",
    size: item?.variant_title || null,
    price: readAmount(item?.unit_price),
    quantity: readAmount(item?.quantity) || 1,
});

const mapOrder = (order) => ({
    id: order?.id,
    displayId: order?.display_id,
    createdAt: order?.created_at,
    fulfillmentStatus: order?.fulfillment_status || "not_fulfilled",
    paymentStatus: order?.payment_status || "not_paid",
    total: readAmount(order?.total),
    currencyCode: order?.currency_code || "",
    items: (order?.items || []).map(mapOrderItem),
});

const getCustomerOrders = async ({ limit = 5, offset = 0 } = {}) => {
    const { orders = [], count = 0 } = await sdk.store.order.list({
        limit,
        offset,
        fields: ORDER_LIST_FIELDS,
    });

    return { orders: orders.map(mapOrder), count };
};

export { getCustomerOrders };
