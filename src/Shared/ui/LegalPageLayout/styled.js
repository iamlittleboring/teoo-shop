import styled from "styled-components";

const UpdatedAt = styled.p`
    font-size: 13px;
    opacity: 0.6;
    color: ${({ theme }) => theme.colors.text};
    margin-top: -8px;
    margin-bottom: 24px;
`;

const Prose = styled.div`
    max-width: 760px;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;

    h2 {
        font-size: 20px;
        font-weight: 800;
        margin-top: 32px;
        margin-bottom: 12px;

        &:first-child {
            margin-top: 0;
        }
    }

    p {
        margin-bottom: 12px;
        opacity: 0.85;
    }

    ul,
    ol {
        margin: 0 0 12px 20px;
        opacity: 0.85;
    }

    li {
        margin-bottom: 6px;
    }

    strong {
        font-weight: 800;
        opacity: 1;
    }

    a {
        text-decoration: underline;
        opacity: 1;
    }
`;

const Styled = {
    UpdatedAt,
    Prose,
};

export default Styled;
