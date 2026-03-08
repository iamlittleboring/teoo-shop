import { CATEGORIES, CATEGORY_ALIASES, SEARCH_SORTS } from "@shared/config";

const allowedSortSet = new Set(SEARCH_SORTS);

/**
 * @typedef {Object} SearchQueryState
 * @property {string} rawQuery
 * @property {string} query
 * @property {string} sort
 * @property {string} minPrice
 * @property {string} maxPrice
 * @property {string[]} selectedCategories
 */

const normalizeCategory = (value) => {
    const key = String(value || "").trim().toLowerCase();
    return CATEGORY_ALIASES[key] || null;
};

/**
 * @param {URLSearchParams} searchParams
 * @returns {SearchQueryState}
 */
const parseSearchQueryState = (searchParams) => {
    const rawQuery = (searchParams.get("q") || "").trim();
    const sortParam = searchParams.get("sort");
    const categoryParam = searchParams.get("category");

    const selectedCategories = categoryParam
        ? Array.from(
              new Set(
                  categoryParam
                      .split(",")
                      .map(normalizeCategory)
                      .filter(Boolean)
              )
          )
        : CATEGORIES;

    return {
        rawQuery,
        query: rawQuery.toLowerCase(),
        sort: allowedSortSet.has(sortParam) ? sortParam : "relevance",
        minPrice: searchParams.get("min") || "",
        maxPrice: searchParams.get("max") || "",
        selectedCategories: selectedCategories.length > 0 ? selectedCategories : CATEGORIES,
    };
};

const buildCategoryFilterMap = (selectedCategories) =>
    CATEGORIES.reduce((acc, category) => {
        acc[category] = selectedCategories.includes(category);
        return acc;
    }, {});

const buildNextSearchParams = (searchParams, patch) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(patch).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
            next.delete(key);
            return;
        }

        next.set(key, value);
    });

    return next;
};

const buildNextCategoriesValue = (selectedCategories, categoryKey, isChecked) => {
    const next = new Set(selectedCategories);

    if (isChecked) {
        next.add(categoryKey);
    } else {
        next.delete(categoryKey);
    }

    const nextList = CATEGORIES.filter((category) => next.has(category));
    return nextList.length === CATEGORIES.length ? null : nextList.join(",");
};

export {
    buildCategoryFilterMap,
    buildNextCategoriesValue,
    buildNextSearchParams,
    parseSearchQueryState,
};
