import { sdk } from "./medusa";

const deleteAccount = async () => {
    await sdk.client.fetch("/store/customers/me", {
        method: "DELETE",
    });
};

export { deleteAccount };
