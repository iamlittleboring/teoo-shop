import { readAmount } from "@shared/lib";

const mapOrderItem = (item) => ({
    lineId: item?.id,
    image: item?.thumbnail || item?.variant?.product?.thumbnail || "",
    name: item?.product_title || item?.title || "",
    size: item?.variant_title || null,
    price: readAmount(item?.unit_price),
    quantity: readAmount(item?.quantity) || 1,
});

export { mapOrderItem };
