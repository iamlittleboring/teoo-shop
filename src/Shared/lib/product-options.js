// Product option titles are merchant-defined (Medusa `product.options[].title`),
// so "is this a color picker" is a best-effort guess from the title text —
// there's no dedicated option type to check against.
const SWATCH_TITLE_HINTS = ["колір", "цвет", "color"];

const isSwatchOptionTitle = (title) => {
    const normalized = String(title || "")
        .trim()
        .toLowerCase();

    return SWATCH_TITLE_HINTS.some((hint) => normalized.includes(hint));
};

export { isSwatchOptionTitle };
