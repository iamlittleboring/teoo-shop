import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { ProductCard, formatProductCode, getProductById } from "@entities/ProductCard";
import { BreadCrumbs, buildProductBreadcrumbItems } from "@features/BreadCrumbs";
import { CartButton } from "@features/CartButton";
import { OptionPicker } from "@features/Picker";
import { useProductsList } from "@shared/lib";
import { Container, Text } from "@shared/styles";
import LoadingState from "@shared/ui/LoadingState";
import SectionTitle from "@shared/ui/SectionTitle";
import { ImageViewer } from "@widgets/ImageViewer";

import { findRelatedProducts } from "../lib/related-products";
import { pickSelectedVariant } from "../lib/variant-selection";
import Styled from "./styled";

const getProductNotes = (t) => [
    t("common.productNotes.care"),
    t("common.productNotes.storage"),
    t("common.productNotes.delivery"),
];

const Product = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { data: products, error: relatedError } = useProductsList();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});

    useEffect(() => {
        let isMounted = true;

        const loadProduct = async () => {
            setIsLoading(true);
            setError(null);

            const response = await getProductById(id);

            if (!isMounted) {
                return;
            }

            if (!response) {
                setError(t("product.notFound"));
                setProduct(null);
                setIsLoading(false);
                return;
            }

            setProduct(response);
            setSelectedOptions(
                Object.fromEntries(
                    (response.options || []).map((option) => [option.title, option.values[0]])
                )
            );
            setIsLoading(false);
        };

        loadProduct().catch(() => {
            if (isMounted) {
                setError(t("product.failedLoad"));
                setIsLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [id, t]);

    const productOptions = product?.options || [];

    const relatedProducts = useMemo(
        () => findRelatedProducts(products, product),
        [product, products]
    );

    if (isLoading) {
        return (
            <section>
                <Container>
                    <LoadingState message={t("common.loadingProduct")} fullPage />
                </Container>
            </section>
        );
    }

    if (error || !product) {
        return (
            <section>
                <Container>
                    <Text>{error || t("product.notFound")}</Text>
                </Container>
            </section>
        );
    }

    const breadcrumbs = buildProductBreadcrumbItems({
        collectionName: product.collection?.name || "Collection",
        collectionSlug: product.collection?.slug,
        productName: product.name,
        productTypeLabel: product.categories?.[0]?.name || t("searchPage.category"),
        productTypeValue: product.categories?.[0]?.handle,
    });
    const productNotes = getProductNotes(t);
    const productTypeLabel =
        product.categories?.map((category) => category.name).join(" / ") ||
        t("searchPage.category");
    const productCode = formatProductCode(product.id, {
        prefix: "TEOO-",
        fallback: "TEOO-000000",
    });
    const selectedVariant = pickSelectedVariant(product.variants || [], selectedOptions);
    const selectedOptionsList = Object.entries(selectedOptions)
        .filter(([, value]) => value)
        .map(([title, value]) => ({ title, value }));
    const isInStock = selectedVariant?.inStock ?? true;

    return (
        <>
            <section>
                <Container>
                    <BreadCrumbs items={breadcrumbs} />
                </Container>
            </section>
            <section>
                <Container>
                    <Styled.Shell>
                        <ImageViewer images={product.images} title={product.name} />
                        <Styled.Data>
                            <Styled.Header>
                                <Styled.MetaRow>
                                    <Styled.Badges>
                                        {product.collection?.name ? (
                                            <Styled.Badge>
                                                {product.collection.name}
                                            </Styled.Badge>
                                        ) : null}
                                        {(product.categories || []).map((category) => (
                                            <Styled.Badge key={category.id || category.handle}>
                                                {category.name}
                                            </Styled.Badge>
                                        ))}
                                    </Styled.Badges>
                                    <Styled.Code>{productCode}</Styled.Code>
                                </Styled.MetaRow>
                                <Styled.Title>{product.name}</Styled.Title>
                                <Styled.Subtitle>{productTypeLabel}</Styled.Subtitle>
                                <Styled.Desc>{product.description}</Styled.Desc>
                            </Styled.Header>

                            <Styled.Bottom>
                                <Styled.PricePanel>
                                    <Styled.PriceMeta>
                                        <Styled.PriceLabel>
                                            {t("common.productLabels.price")}
                                        </Styled.PriceLabel>
                                        <Styled.PriceRow>
                                            <Styled.Price>
                                                {product.price}{" "}
                                                <Styled.Currency>
                                                    {t("common.currency")}
                                                </Styled.Currency>
                                            </Styled.Price>
                                            {product.originalPrice ? (
                                                <Styled.OriginalPrice>
                                                    {product.originalPrice}{" "}
                                                    {t("common.currency")}
                                                </Styled.OriginalPrice>
                                            ) : null}
                                        </Styled.PriceRow>
                                    </Styled.PriceMeta>
                                    <Styled.StockBlock>
                                        <Styled.StockState $out={!isInStock}>
                                            {t(
                                                isInStock
                                                    ? "common.productStatus.inStock"
                                                    : "common.productStatus.outOfStock"
                                            )}
                                        </Styled.StockState>
                                        {isInStock && (
                                            <Styled.StockHint>
                                                {t("common.productStatus.shipping")}
                                            </Styled.StockHint>
                                        )}
                                    </Styled.StockBlock>
                                </Styled.PricePanel>

                                {productOptions.length > 0 ? (
                                    <Styled.Options>
                                        {productOptions.map((option) => (
                                            <Styled.OptionBlock key={option.id || option.title}>
                                                <OptionPicker
                                                    title={option.title}
                                                    items={option.values}
                                                    selected={selectedOptions[option.title]}
                                                    onSelect={(value) =>
                                                        setSelectedOptions((prev) => ({
                                                            ...prev,
                                                            [option.title]: value,
                                                        }))
                                                    }
                                                    itemHeight="48px"
                                                    itemWidth="48px"
                                                    ariaLabelPrefix={option.title}
                                                />
                                            </Styled.OptionBlock>
                                        ))}
                                    </Styled.Options>
                                ) : null}

                                <Styled.Actions>
                                    <CartButton
                                        options={selectedOptionsList}
                                        styleVariant={product.cardVariant}
                                        variantId={selectedVariant?.id}
                                        disabled={!isInStock}
                                    />
                                </Styled.Actions>
                            </Styled.Bottom>
                        </Styled.Data>
                    </Styled.Shell>
                </Container>
            </section>
            <section>
                <Container>
                    <Styled.ContentSection>
                        <SectionTitle sideText={product.collection?.name}>
                            {t("common.productSections.about")}
                        </SectionTitle>
                        <Styled.ContentGrid>
                            <Styled.ContentCard>
                                <Styled.ContentTitle>
                                    {t("common.productSections.description")}
                                </Styled.ContentTitle>
                                <Styled.ContentText>
                                    {product.description}
                                </Styled.ContentText>
                                <Styled.ContentText>
                                    {t("common.productAboutExtended", {
                                        name: product.name,
                                        collection: product.collection?.name,
                                    })}
                                </Styled.ContentText>
                            </Styled.ContentCard>
                            <Styled.ContentCard>
                                <Styled.ContentTitle>
                                    {t("common.productSections.notes")}
                                </Styled.ContentTitle>
                                <Styled.NoteList>
                                    {productNotes.map((item) => (
                                        <Styled.NoteItem key={item}>
                                            {item}
                                        </Styled.NoteItem>
                                    ))}
                                </Styled.NoteList>
                            </Styled.ContentCard>
                        </Styled.ContentGrid>
                    </Styled.ContentSection>
                </Container>
            </section>
            {!relatedError && relatedProducts.length > 0 ? (
                <section>
                    <Container>
                        <Styled.ContentSection>
                            <SectionTitle sideText={product.collection?.name}>
                                {t("common.productSections.related")}
                            </SectionTitle>
                            <Styled.RelatedProducts>
                                {relatedProducts.map((item) => (
                                    <ProductCard
                                        key={item.id}
                                        product={item}
                                        variant={item.cardVariant}
                                    />
                                ))}
                            </Styled.RelatedProducts>
                        </Styled.ContentSection>
                    </Container>
                </section>
            ) : null}
        </>
    );
};

export default Product;
