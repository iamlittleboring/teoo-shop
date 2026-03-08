import { Link } from "react-router-dom";
import styled from "styled-components";

const getAccent = (theme, variant) =>
    theme.ui.accents[variant] || theme.ui.accents.classic;

const getBadgeBg = (theme, variant) =>
    theme.ui.productCard.badgeBg[variant] || theme.ui.productCard.badgeBg.classic;

const Box = styled.article`
    border-radius: 22px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 560px;
    border: 1px solid
        ${({ theme }) =>
            theme.mode === "light"
                ? theme.ui.productCard.borderLight
                : theme.ui.productCard.borderDark};
    background-color: ${({ theme }) => theme.colors.bg};
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        inset: 0 auto auto 0;
        width: 100%;
        height: 3px;
        background: ${({ theme, $variant }) => getAccent(theme, $variant)};
        opacity: 0.9;
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: ${({ theme }) => theme.ui.productCard.hoverShadow};
    }
`;

const ImageLink = styled(Link)`
    display: block;
`;

const ImageWrap = styled.div`
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    ${Box}:hover & {
        transform: scale(1.04);
    }
`;

const BadgeLink = styled(Link)`
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 6px 10px;
    border-radius: 999px;
    background-color: ${({ theme, $variant }) => getBadgeBg(theme, $variant)};
    color: ${({ theme }) => theme.ui.productCard.badgeText};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;

    &:hover {
        opacity: 0.9;
    }
`;

const Data = styled.div`
    padding: 14px 16px 16px;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 10px;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Code = styled.span`
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    opacity: ${({ theme }) => theme.ui.productCard.codeOpacity};
`;

const Tag = styled.span`
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme, $variant }) => getAccent(theme, $variant)};
`;

const TagLink = styled(Link)`
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme, $variant }) => getAccent(theme, $variant)};

    &:hover {
        opacity: 0.85;
    }
`;

const Name = styled.h2`
    font-size: clamp(24px, 2.6vw, 30px);
    font-weight: 800;
    line-height: 1.05;
    color: ${({ theme }) => theme.colors.text};
`;

const Desc = styled.p`
    font-size: 15px;
    line-height: 1.45;
    color: ${({ theme }) => theme.colors.text};
    opacity: ${({ theme }) => theme.ui.productCard.descOpacity};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 22px;
`;

const Buy = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    margin-bottom: 10px;
    padding-top: 10px;
    border-top: 1px solid ${({ theme }) => theme.ui.productCard.buyBorder};
    gap: 8px;
`;

const Actions = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
`;

const Prices = styled.div`
    display: flex;
    flex-direction: column;
`;

const PriceLabel = styled.span`
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.text};
    opacity: ${({ theme }) => theme.ui.productCard.priceLabelOpacity};
`;

const Price = styled.p`
    font-size: 30px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1;
`;

const Currency = styled.span`
    text-transform: uppercase;
`;

const Styled = {
    Box,
    ImageLink,
    ImageWrap,
    Image,
    BadgeLink,
    Data,
    Top,
    Code,
    Tag,
    TagLink,
    Name,
    Desc,
    Buy,
    Actions,
    Prices,
    PriceLabel,
    Price,
    Currency,
};

export default Styled;
