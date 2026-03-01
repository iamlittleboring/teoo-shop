import Styled from "./styled";

const CartItem = ({
    color,
    count,
    image,
    name,
    onRemove,
    price,
    setCount,
    size,
}) => {
    return (
        <Styled.Container>
            <Styled.Image src={image} alt={name} loading="lazy" />
            <Styled.Info>
                <Styled.Name>{name}</Styled.Name>
                <Styled.Details>
                    {size && <Styled.Size>Size: {size}</Styled.Size>}
                    {color && (
                        <Styled.Color>
                            Color: <Styled.Dot $color={color} />
                        </Styled.Color>
                    )}
                </Styled.Details>
                <Styled.Price>{price} грн</Styled.Price>
                <Styled.Counter>
                    <Styled.CounterButton
                        type="button"
                        onClick={() => setCount(count - 1)}
                        disabled={count <= 1}
                        aria-label="Decrease quantity"
                    >
                        -
                    </Styled.CounterButton>
                    <Styled.CounterValue>{count}</Styled.CounterValue>
                    <Styled.CounterButton
                        type="button"
                        onClick={() => setCount(count + 1)}
                        aria-label="Increase quantity"
                    >
                        +
                    </Styled.CounterButton>
                </Styled.Counter>
            </Styled.Info>
            <Styled.RemoveButton
                type="button"
                onClick={onRemove}
                aria-label="Remove item"
            >
                Remove
            </Styled.RemoveButton>
        </Styled.Container>
    );
};

export default CartItem;
