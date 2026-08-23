import { sdk } from "./medusa";

const verifyEmail = async ({ email, token }) => {
    await sdk.client.fetch("/store/customers/verify-email", {
        method: "POST",
        body: { email, token },
    });
};

export { verifyEmail };
