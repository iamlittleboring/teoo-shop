const formatProductCode = (id, { prefix = "#", fallback } = {}) => {
    const normalized = String(id || "").trim();

    if (!normalized) {
        return fallback ?? `${prefix}00`;
    }

    const shortId = normalized.startsWith("prod_")
        ? normalized.slice("prod_".length, "prod_".length + 6)
        : normalized.slice(0, 6);

    return `${prefix}${shortId.toUpperCase()}`;
};

export { formatProductCode };
