// Clamps `page` into range and slices `items` for that page — shared by
// Search and Collection so the two don't keep independent copies of the
// same page-math.
const paginate = (items, page, pageSize) => {
    const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
    const currentPage = Math.min(Math.max(1, page), pageCount);
    const pageItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return { pageCount, currentPage, pageItems };
};

export { paginate };
