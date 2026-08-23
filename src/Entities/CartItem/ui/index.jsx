import ModalProductItem from "@shared/ui/ModalProductItem";
import { isSwatchOptionTitle } from "@shared/lib";
import trashIcon from "@shared/assets/images/trash.svg";
import { useTranslation } from "react-i18next";

import Styled from "./styled";

const CartItem = ({
    count,
    image,
    name,
    onRemove,
    options = [],
    price,
    setCount,
}) => {
    const { t } = useTranslation();

    return (
        <ModalProductItem
            image={image}
            name={name}
            price={price}
            details={
                <Styled.Details>
                    {options.map((option) =>
                        isSwatchOptionTitle(option.title) ? (
                            <Styled.Color key={option.title}>
                                {option.title} <Styled.Dot $color={option.value} />
                            </Styled.Color>
                        ) : (
                            <Styled.Size key={option.title}>
                                {option.title}: {option.value}
                            </Styled.Size>
                        )
                    )}
                </Styled.Details>
            }
            action={
                <Styled.Actions>
                    <Styled.ActionButton
                        type="button"
                        onClick={() => setCount(Math.min(10, count + 1))}
                        disabled={count >= 10}
                        aria-label={t("cart.increase")}
                    >
                        +
                    </Styled.ActionButton>
                    <Styled.CountValue>{count}</Styled.CountValue>
                    {count === 1 ? (
                        <Styled.ActionButton
                            type="button"
                            onClick={onRemove}
                            aria-label={t("cart.removeItem")}
                        >
                            <Styled.TrashIcon src={trashIcon} alt="" aria-hidden="true" />
                        </Styled.ActionButton>
                    ) : (
                        <Styled.ActionButton
                            type="button"
                            onClick={() => setCount(count - 1)}
                            aria-label={t("cart.decrease")}
                        >
                            -
                        </Styled.ActionButton>
                    )}
                </Styled.Actions>
            }
        />
    );
};

export default CartItem;
