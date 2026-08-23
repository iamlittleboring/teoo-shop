// Every error message in this modal follows the same "<key>" / "<key>Detailed"
// translation pair — plain copy when the error carries no message, the
// server's message interpolated in when it does.
const formatErrorText = (t, key, error) =>
    error?.message ? t(`${key}Detailed`, { message: error.message }) : t(key);

export { formatErrorText };
