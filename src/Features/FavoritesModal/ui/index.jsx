import { SubTitle, Text } from "@shared/styles";
import { useFavorites } from "@shared/lib";
import Modal from "@shared/ui/Modal";
import ModalProductItem from "@shared/ui/ModalProductItem";
import { useTranslation } from "react-i18next";

import Styled from "./styled";

const FavoritesModal = ({ isOpen, onClose }) => {
    const { clearFavorites, items, removeFavorite } = useFavorites();
    const { t } = useTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t("favorites.title")}>
            <Styled.Container>
                <SubTitle $color="inherit">{t("favorites.title")}</SubTitle>

                {items.length === 0 && <Text>{t("favorites.empty")}</Text>}

                {items.length > 0 && (
                    <Styled.Items>
                        {items.map((item) => (
                            <ModalProductItem
                                key={item.id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                nameTo={`/product/${item.id}`}
                                onNameClick={onClose}
                                action={
                                    <Styled.Remove
                                        type="button"
                                        onClick={() => removeFavorite(item.id)}
                                    >
                                        {t("favorites.remove")}
                                    </Styled.Remove>
                                }
                            />
                        ))}
                    </Styled.Items>
                )}

                {items.length > 0 && (
                    <Styled.ClearButton type="button" onClick={clearFavorites}>
                        {t("favorites.clear")}
                    </Styled.ClearButton>
                )}
            </Styled.Container>
        </Modal>
    );
};

export default FavoritesModal;
