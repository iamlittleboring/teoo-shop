import Styled from "./styled";

const SizePicker = ({ items, selected, onSelect, itemWidth, itemHeight }) => {
    return (
        <Styled.Box>
            {items.map(({ id, size }) => (
                <Styled.SizeButton
                    key={id}
                    onClick={() => onSelect(id)}
                    $clicked={selected === id}
                    $width={itemWidth}
                    $height={itemHeight}
                >
                    {size}
                </Styled.SizeButton>
            ))}
        </Styled.Box>
    );
};

const ColorPicker = ({ items, selected, onSelect, itemWidth, itemHeight }) => {
    return (
        <Styled.Box>
            {items.map(({ id, color }) => (
                <Styled.ColorButton
                    key={id}
                    onClick={() => onSelect(id)}
                    $color={color}
                    $clicked={selected === id}
                    $width={itemWidth}
                    $height={itemHeight}
                />
            ))}
        </Styled.Box>
    );
};

export { SizePicker, ColorPicker };
