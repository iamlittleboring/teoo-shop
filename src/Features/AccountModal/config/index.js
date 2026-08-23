export const ORDERS_PAGE_SIZE = 5;

export const VIEWSTATE = {
    ACCOUNT: "account",
    LOGIN: "login",
    REGISTER: "register",
    RESET_PASSWORD: "reset-password",
    RESET_PASSWORD_CONFIRM: "reset-password-confirm",
    VERIFY_EMAIL: "verify-email",
    GOOGLE_CALLBACK: "google-callback",
};

export const loginState = {
    email: "",
    password: "",
};

export const registerState = {
    email: "",
    password: "",
    repeatPassword: "",
};

export const resetState = {
    email: "",
};

export const resetConfirmState = {
    email: "",
    token: "",
    password: "",
    repeatPassword: "",
};
