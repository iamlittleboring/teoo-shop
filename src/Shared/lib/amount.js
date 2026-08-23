const readAmount = (value) => {
    const normalized = Number(value);
    return Number.isFinite(normalized) ? normalized : 0;
};

export { readAmount };
