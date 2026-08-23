import { sdk } from "./medusa";

const listShippingOptions = async (cartId) => {
    const { shipping_options } = await sdk.store.fulfillment.listCartOptions({
        cart_id: cartId,
    });

    return shipping_options || [];
};

const listPaymentProviders = async (regionId) => {
    const { payment_providers } = await sdk.store.payment.listPaymentProviders({
        region_id: regionId,
    });

    return payment_providers || [];
};

export { listPaymentProviders, listShippingOptions };
