import ModalProductItem from "@shared/ui/ModalProductItem";
import trashIcon from "@shared/assets/images/trash.svg";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    return (
        <ModalProductItem
            image={image}
            name={name}
            price={price}
            details={
                <Styled.Details>
                    {size && <Styled.Size>{t("cart.size", { size })}</Styled.Size>}
                    {color && (
                        <Styled.Color>
                            {t("cart.color")} <Styled.Dot $color={color} />
                        </Styled.Color>
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
