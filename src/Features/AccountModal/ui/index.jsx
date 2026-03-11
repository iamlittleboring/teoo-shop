import { useTranslation } from "react-i18next";

import { SubTitle, Text } from "@shared/styles";
import Modal from "@shared/ui/Modal";

import Styled from "./styled";

const AccountModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Styled.Container>
                <SubTitle $color="inherit">{t("account.title")}</SubTitle>
                <Text>{t("account.empty")}</Text>
            </Styled.Container>
        </Modal>
    );
};

export default AccountModal;
