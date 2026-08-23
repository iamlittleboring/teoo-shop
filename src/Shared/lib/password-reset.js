import { sdk } from "./medusa";

const requestPasswordReset = async (email) => {
    await sdk.auth.resetPassword("customer", "emailpass", {
        identifier: email,
    });
};

const confirmPasswordReset = async ({ email, token, password }) => {
    await sdk.auth.updateProvider(
        "customer",
        "emailpass",
        { email, password },
        token
    );
};

export { confirmPasswordReset, requestPasswordReset };
