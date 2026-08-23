import { useCallback, useEffect, useMemo, useState } from "react";

import { AuthContext } from "./auth-context";
import { deleteAccount as deleteAccountRequest } from "./delete-account";
import { sdk } from "./medusa";

// Reads the JWT's payload without verifying its signature — fine here since
// it's the token our own backend just issued, only being used to pull the
// Google profile (email/name) it already embedded, not to trust its claims.
const decodeJwtPayload = (token) => {
    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const json = decodeURIComponent(
            atob(base64)
                .split("")
                .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
                .join("")
        );
        return JSON.parse(json);
    } catch {
        return null;
    }
};

const AuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshCustomer = useCallback(async () => {
        try {
            const { customer } = await sdk.store.customer.retrieve();
            setCustomer(customer);
            return customer;
        } catch {
            setCustomer(null);
            return null;
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            await refreshCustomer();

            if (isMounted) {
                setIsLoading(false);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [refreshCustomer]);

    const login = useCallback(
        async ({ email, password }) => {
            await sdk.auth.login("customer", "emailpass", { email, password });
            return refreshCustomer();
        },
        [refreshCustomer]
    );

    const register = useCallback(
        async ({ email, password }) => {
            await sdk.auth.register("customer", "emailpass", { email, password });
            await sdk.store.customer.create({ email });
            await sdk.auth.login("customer", "emailpass", { email, password });
            return refreshCustomer();
        },
        [refreshCustomer]
    );

    // Kicks off the Google OAuth handshake — the backend hands back a Google
    // consent-screen URL rather than a token, since this actor needs to
    // authenticate with a third party first.
    const loginWithGoogle = useCallback(async () => {
        const result = await sdk.auth.login("customer", "google");

        if (result && typeof result === "object" && result.location) {
            window.location.href = result.location;
        }
    }, []);

    // Called once Google redirects back with `code`/`state` in the URL. Exchanges
    // them for a session, then resolves the customer record on first sign-in —
    // the Google profile (email/name) is read off the session JWT's payload,
    // which Medusa already embedded there, and handed to a small custom
    // backend route (/store/customers/oauth-link) that links this sign-in to
    // an existing account sharing that email, or creates a new one.
    const loginWithGoogleCallback = useCallback(
        async (query) => {
            const token = await sdk.auth.callback("customer", "google", query);

            try {
                await sdk.store.customer.retrieve();
            } catch {
                const profile = decodeJwtPayload(token)?.user_metadata || {};

                await sdk.client.fetch("/store/customers/oauth-link", {
                    method: "POST",
                    body: {
                        email: profile.email,
                        first_name: profile.given_name || undefined,
                        last_name: profile.family_name || undefined,
                    },
                });
            }

            return refreshCustomer();
        },
        [refreshCustomer]
    );

    const logout = useCallback(async () => {
        await sdk.auth.logout();
        setCustomer(null);
    }, []);

    const deleteAccount = useCallback(async () => {
        await deleteAccountRequest();
        await sdk.auth.logout();
        setCustomer(null);
    }, []);

    const value = useMemo(
        () => ({
            customer,
            deleteAccount,
            isAuthenticated: Boolean(customer),
            isLoading,
            login,
            loginWithGoogle,
            loginWithGoogleCallback,
            logout,
            refreshCustomer,
            register,
        }),
        [
            customer,
            deleteAccount,
            isLoading,
            login,
            loginWithGoogle,
            loginWithGoogleCallback,
            logout,
            refreshCustomer,
            register,
        ]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
