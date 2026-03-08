import Styled from "./styled";

const SearchFilters = ({
    categoryFilter,
    categoryLabels,
    maxPlaceholder,
    maxPrice,
    minPlaceholder,
    minPrice,
    onCategoryChange,
    onMaxPriceChange,
    onMinPriceChange,
    onReset,
    resetLabel,
    titleCategory,
    titlePriceRange,
}) => {
    return (
        <Styled.Sidebar>
            <Styled.FilterBlock>
                <Styled.FilterTitle>{titleCategory}</Styled.FilterTitle>
                {Object.entries(categoryLabels).map(([key, label]) => (
                    <Styled.CheckboxLabel key={key}>
                        <input
                            type="checkbox"
                            name={key}
                            checked={categoryFilter[key]}
                            onChange={onCategoryChange}
                        />
                        {label}
                    </Styled.CheckboxLabel>
                ))}
            </Styled.FilterBlock>

            <Styled.FilterBlock>
                <Styled.FilterTitle>{titlePriceRange}</Styled.FilterTitle>
                <Styled.RangeRow>
                    <Styled.Field
                        type="number"
                        min="0"
                        placeholder={minPlaceholder}
                        value={minPrice}
                        onChange={onMinPriceChange}
                    />
                    <Styled.Field
                        type="number"
                        min="0"
                        placeholder={maxPlaceholder}
                        value={maxPrice}
                        onChange={onMaxPriceChange}
                    />
                </Styled.RangeRow>
            </Styled.FilterBlock>

            <Styled.ResetButton type="button" onClick={onReset}>
                {resetLabel}
            </Styled.ResetButton>
        </Styled.Sidebar>
    );
};

export default SearchFilters;
