import styled from "styled-components";

import { InputField } from "@shared/styles/form";
import { iconBaseStyles } from "@shared/ui/icon-button-base";

const Wrapper = styled.div`
    position: relative;
`;

const Trigger = styled(InputField).attrs({ as: "button", type: "button" })`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    text-align: left;
    cursor: pointer;
`;

const TriggerLabel = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: ${({ $isPlaceholder }) => ($isPlaceholder ? 0.42 : 1)};
    font-weight: ${({ $isPlaceholder }) => ($isPlaceholder ? 500 : 600)};
`;

const Arrow = styled.img`
    ${iconBaseStyles};
    flex-shrink: 0;
    transition: transform 0.2s ease;
    transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
`;

const Dropdown = styled.div`
    position: absolute;
    z-index: 5;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    max-height: 240px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.ui.panel.border};
    background: ${({ theme }) =>
        theme.mode === "light" ? theme.ui.modal.bgLight : theme.ui.modal.bgDark};
    box-shadow: ${({ theme }) => theme.ui.iconButton.hoverShadow};
`;

const Option = styled.button`
    text-align: left;
    padding: 10px 14px;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    background: ${({ theme, $active }) =>
        $active ? `${theme.ui.accents.classic}14` : "transparent"};

    &:hover {
        background-color: ${({ theme }) =>
            theme.mode === "light" ? theme.ui.panel.bgLight : theme.ui.panel.bgDark};
    }
`;

const Styled = { Wrapper, Trigger, TriggerLabel, Arrow, Dropdown, Option };

export default Styled;
