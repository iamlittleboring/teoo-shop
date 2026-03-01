import { Link } from "react-router-dom";

import { SubTitle, Text } from "@shared/styles";
import { useFavorites } from "@shared/lib";
import Modal from "@shared/ui/Modal";

import Styled from "./styled";

const FavoritesModal = ({ isOpen, onClose }) => {
    const { clearFavorites, items, removeFavorite } = useFavorites();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Favorites">
            <Styled.Container>
                <SubTitle $color="inherit">Favorites</SubTitle>

                {items.length === 0 && <Text>You have no favorites yet.</Text>}

                {items.map((item) => (
                    <Styled.Item key={item.id}>
                        <Styled.Image src={item.image} alt={item.name} loading="lazy" />
                        <Styled.Info>
                            <Link to={`/product/${item.id}`} onClick={onClose}>
                                <Styled.Name>{item.name}</Styled.Name>
                            </Link>
                            <Styled.Price>{item.price} грн</Styled.Price>
                        </Styled.Info>
                        <Styled.Remove
                            type="button"
                            onClick={() => removeFavorite(item.id)}
                        >
                            Remove
                        </Styled.Remove>
                    </Styled.Item>
                ))}

                {items.length > 0 && (
                    <Styled.ClearButton type="button" onClick={clearFavorites}>
                        Clear favorites
                    </Styled.ClearButton>
                )}
            </Styled.Container>
        </Modal>
    );
};

export default FavoritesModal;
