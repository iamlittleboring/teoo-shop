import styled from "styled-components";
import Button from "@shared/ui/Button";
import { Text } from "./index";

const PanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

const PanelTitle = styled.h3`
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
`;

const StatusMessage = styled(Text)`
    color: ${({ theme, $tone }) =>
        $tone === "error" ? theme.ui.panel.danger : theme.colors.text};
    opacity: ${({ $tone }) => ($tone ? 1 : 0.68)};
    font-size: 14px;
    line-height: 1.4;
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

const DangerLinkButton = styled(Button)`
    min-width: auto;
    width: auto;
    height: auto;
    min-height: auto;
    padding: 0;
    border-radius: 0;
    border-bottom-width: 1px;
    border-bottom-style: solid;
`;

const DangerOutlineButton = styled(Button)`
    align-self: flex-start;
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
    PanelTitle,
    Price,
    StatusMessage,
    Thumb,
    Total,
};
