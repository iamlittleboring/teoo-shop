// The account modal opens itself and jumps to a specific view whenever the
// URL carries one of these query params — set by a link from a password
// reset / email verification / Google OAuth redirect.
const hasAccountFlowParams = (searchParams) =>
    searchParams.get("reset-password") === "confirm" ||
    searchParams.get("verify-email") === "confirm" ||
    searchParams.get("google_return") === "1";

const stripAccountFlowParams = (searchParams) => {
    const next = new URLSearchParams(searchParams);

    next.delete("reset-password");
    next.delete("verify-email");
    next.delete("email");
    next.delete("token");
    next.delete("google_return");
    next.delete("code");
    next.delete("state");

    return next;
};

export { hasAccountFlowParams, stripAccountFlowParams };
