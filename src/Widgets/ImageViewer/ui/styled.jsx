import styled from "styled-components";

const Box = styled.div``;

const MainImageBlock = styled.div`
    max-width: 100%;
    overflow: hidden;
    border-radius: 5px;
    cursor: move;
`;

const MainImage = styled.img`
    width: 100%;
`;

const List = styled.div`
    position: relative;
    margin-top: 10px;
`;

const ListInner = styled.div`
    max-width: 100%;
    display: flex;
    gap: 10px;
    overflow-x: scroll;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const ListButton = styled.button`
    font-size: 42px;
    z-index: 9999;
    position: absolute;
    cursor: pointer;
    translate: 0 -50%;
    color: ${({ theme }) => theme.ui.imageViewer.navButtonColor};

    &.left {
        top: 50%;
        left: 5px;
    }

    &.right {
        top: 50%;
        right: 5px;
    }
`;

const ListImage = styled.img`
    min-width: calc(33% - 5px);
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 5px;
    filter: ${({ $clicked }) => ($clicked ? "" : "brightness(50%)")};
    cursor: pointer;

    &:hover {
        filter: brightness(100%);
    }
`;

const Styled = {
    Box,
    MainImageBlock,
    MainImage,
    List,
    ListButton,
    ListInner,
    ListImage,
};

export default Styled;
