import { useTranslation } from "react-i18next";

import Styled from "./styled";

// Windows the page numbers down to first/last + a neighborhood around the
// current page once there are more than 7, with "…" filling the gaps —
// otherwise a large catalog would render one button per page.
const buildPageItems = (page, pageCount) => {
    if (pageCount <= 7) {
        return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    const candidates = new Set([1, 2, pageCount - 1, pageCount, page - 1, page, page + 1]);
    const sorted = [...candidates]
        .filter((value) => value >= 1 && value <= pageCount)
        .sort((a, b) => a - b);

    const items = [];
    let previous = 0;

    for (const value of sorted) {
        if (previous && value - previous > 1) {
            items.push("ellipsis");
        }
        items.push(value);
        previous = value;
    }

    return items;
};

const Pagination = ({ page, pageCount, onChange }) => {
    const { t } = useTranslation();

    if (pageCount <= 1) {
        return null;
    }

    const items = buildPageItems(page, pageCount);

    return (
        <Styled.Nav aria-label={t("pagination.aria")}>
            <Styled.StepButton
                type="button"
                onClick={() => onChange(page - 1)}
                disabled={page <= 1}
            >
                {t("pagination.prev")}
            </Styled.StepButton>

            {items.map((item, index) =>
                item === "ellipsis" ? (
                    <Styled.Ellipsis key={`ellipsis-${index}`}>…</Styled.Ellipsis>
                ) : (
                    <Styled.PageButton
                        key={item}
                        type="button"
                        $active={item === page}
                        aria-current={item === page ? "page" : undefined}
                        onClick={() => onChange(item)}
                    >
                        {item}
                    </Styled.PageButton>
                )
            )}

            <Styled.StepButton
                type="button"
                onClick={() => onChange(page + 1)}
                disabled={page >= pageCount}
            >
                {t("pagination.next")}
            </Styled.StepButton>
        </Styled.Nav>
    );
};

export default Pagination;
