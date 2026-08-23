import styled from "styled-components";

const Shell = styled.div`
    display: flex;
    gap: 40px;
    align-items: stretch;

    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const Data = styled.div`
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

const MetaRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
`;

const Badges = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

const Badge = styled.span`
    padding: 7px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    background-color: ${({ theme }) =>
        theme.mode === "light" ? "rgba(17, 24, 39, 0.06)" : "rgba(255, 255, 255, 0.08)"};
    color: ${({ theme }) => theme.colors.text};
`;

const Code = styled.span`
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.66;
`;

const Title = styled.h1`
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 800;
    line-height: 0.98;
    color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.p`
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
`;

const Desc = styled.p`
    max-width: 60ch;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
`;

const Bottom = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Options = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 18px;
`;

const OptionBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    flex: 0 0 auto;
    width: fit-content;
    max-width: 100%;
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
`;

const PricePanel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

const PriceMeta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const PriceLabel = styled.span`
    display: inline-block;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: baseline;
    gap: 12px;
    flex-wrap: wrap;
`;

const Price = styled.p`
    font-size: clamp(34px, 4.6vw, 46px);
    font-weight: 800;
    line-height: 1;
    color: ${({ theme }) => theme.colors.text};
`;

const OriginalPrice = styled.p`
    font-size: clamp(18px, 2.2vw, 22px);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
    text-decoration: line-through;
`;

const Currency = styled.span`
    text-transform: uppercase;
`;

const StockBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid
        ${({ theme }) =>
            theme.mode === "light"
                ? "rgba(17, 24, 39, 0.08)"
                : "rgba(255, 255, 255, 0.12)"};
    background-color: ${({ theme }) =>
        theme.mode === "light" ? "rgba(17, 24, 39, 0.03)" : "rgba(255, 255, 255, 0.04)"};
`;

const StockState = styled.span`
    font-size: 14px;
    font-weight: 800;
    color: ${({ theme, $out }) => ($out ? theme.ui.panel.danger : theme.colors.text)};
`;

const StockHint = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.72;
`;

const ContentSection = styled.div`
    padding-top: 42px;
`;

const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 18px;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`;

const ContentCard = styled.article`
    padding: 22px;
    border-radius: 8px;
    border: 1px solid
        ${({ theme }) =>
            theme.mode === "light"
                ? "rgba(17, 24, 39, 0.08)"
                : "rgba(255, 255, 255, 0.12)"};
    background-color: ${({ theme }) =>
        theme.mode === "light" ? "rgba(255, 255, 255, 0.78)" : "rgba(255, 255, 255, 0.03)"};
`;

const ContentTitle = styled.h2`
    margin-bottom: 14px;
    font-size: 20px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
`;

const ContentText = styled.p`
    font-size: 16px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};

    & + & {
        margin-top: 14px;
    }
`;

const NoteList = styled.ul`
    display: grid;
    gap: 12px;
`;

const NoteItem = styled.li`
    position: relative;
    padding-left: 16px;
    font-size: 15px;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.text};

    &::before {
        content: "";
        position: absolute;
        top: 10px;
        left: 0;
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background-color: ${({ theme }) => theme.colors.text};
    }
`;

const RelatedProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 26px;
    align-items: stretch;
`;

const Styled = {
    Shell,
    Data,
    Header,
    MetaRow,
    Badges,
    Badge,
    Code,
    Title,
    Subtitle,
    Desc,
    Bottom,
    Options,
    OptionBlock,
    Actions,
    PricePanel,
    PriceMeta,
    PriceLabel,
    PriceRow,
    Price,
    OriginalPrice,
    Currency,
    StockBlock,
    StockState,
    StockHint,
    ContentSection,
    ContentGrid,
    ContentCard,
    ContentTitle,
    ContentText,
    NoteList,
    NoteItem,
    RelatedProducts,
};

export default Styled;
