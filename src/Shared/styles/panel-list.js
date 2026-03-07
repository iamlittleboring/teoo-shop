import styled from "styled-components";

const PanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

const PanelCard = styled.article`
    display: grid;
    grid-template-columns: 84px 1fr auto;
    gap: 12px;
    align-items: center;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    border-radius: 12px;
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};
`;

const Thumb = styled.img`
    width: 84px;
    height: 84px;
    border-radius: 10px;
    object-fit: cover;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
`;

const Name = styled.p`
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`;

const Meta = styled.p`
    font-size: 14px;
    opacity: 0.75;
    color: ${({ theme }) => theme.colors.text};
`;

const Price = styled.p`
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
`;

const DangerLinkButton = styled.button`
    border-bottom: 1px solid ${({ theme }) => theme.ui.panel.danger};
    color: ${({ theme }) => theme.ui.panel.danger};
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const DangerOutlineButton = styled.button`
    align-self: flex-start;
    border: 1px solid ${({ theme }) => theme.ui.panel.danger};
    border-radius: 8px;
    color: ${({ theme }) => theme.ui.panel.danger};
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.ui.panel.dangerHoverBg};
    }
`;

const FooterRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
`;

const Total = styled.p`
    font-size: 20px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
`;

export {
    DangerLinkButton,
    DangerOutlineButton,
    FooterRow,
    Info,
    Meta,
    Name,
    PanelCard,
    PanelContainer,
    Price,
    Thumb,
    Total,
};
