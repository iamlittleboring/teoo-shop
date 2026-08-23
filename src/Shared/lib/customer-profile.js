import { sdk } from "./medusa";

const updateCustomerProfile = async (profile) => {
    const { customer } = await sdk.store.customer.update(profile);
    return customer;
};

export { updateCustomerProfile };
