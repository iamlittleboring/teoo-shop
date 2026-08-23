const variantMatchesOption = (variant, title, value) =>
    (variant.options || []).some((option) => option.title === title && option.value === value);

// Prefers a variant matching every selected option; falls back to one
// matching at least one (covers a product mid-selection, before every
// dimension has a value), then just the first variant if nothing matches.
const pickSelectedVariant = (variants, selectedOptions) => {
    if (variants.length === 0) {
        return null;
    }

    const selectedEntries = Object.entries(selectedOptions).filter(([, value]) => value);

    const exactMatch = variants.find((variant) =>
        selectedEntries.every(([title, value]) => variantMatchesOption(variant, title, value))
    );

    if (exactMatch) {
        return exactMatch;
    }

    const partialMatch = variants.find((variant) =>
        selectedEntries.some(([title, value]) => variantMatchesOption(variant, title, value))
    );

    return partialMatch || variants[0];
};

export { pickSelectedVariant, variantMatchesOption };
