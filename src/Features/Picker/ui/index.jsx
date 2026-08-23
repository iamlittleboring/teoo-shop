import { isSwatchOptionTitle } from "@shared/lib";

import Styled from "./styled";

// A single generic option picker used for every product option dimension
// (size, color, material, ...) — a product can have any number of these,
// each with its own set of values. Options whose title reads as a color
// (see isSwatchOptionTitle) render as color swatches; everything else
// renders as plain text pills.
const OptionPicker = ({ ariaLabelPrefix, items, selected, onSelect, itemWidth, itemHeight, title }) => {
    const swatch = isSwatchOptionTitle(title);
    const Button = swatch ? Styled.SwatchButton : Styled.PillButton;

    return (
        <Styled.Box role="list">
            {items.map((value) => (
                <Button
                    key={value}
                    type="button"
                    onClick={() => onSelect(value)}
                    $color={swatch ? value : undefined}
                    $clicked={selected === value}
                    $width={itemWidth}
                    $height={itemHeight}
                    aria-pressed={selected === value}
                    aria-label={`${ariaLabelPrefix || title}: ${value}`}
                >
                    {swatch ? null : value}
                </Button>
            ))}
        </Styled.Box>
    );
};

export { OptionPicker };
