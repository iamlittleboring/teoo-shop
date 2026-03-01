import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "@entities/ProductCard/api";
import { BreadCrumbs } from "@features/BreadCrumbs";
import { CartButton } from "@features/CartButton";
import { ColorPicker, SizePicker } from "@features/Picker";
import { Container, Text } from "@shared/styles";
import { ImageViewer } from "@widgets/ImageViewer";

import Styled from "./styled";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

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
                setError("Product not found");
                setProduct(null);
                setIsLoading(false);
                return;
            }

            setProduct(response);
            setSelectedSize(response.availableSizes[0]);
            setSelectedColor(response.availableColors[0]);
            setIsLoading(false);
        };

        loadProduct().catch(() => {
            if (isMounted) {
                setError("Failed to load product");
                setIsLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [id]);

    const sizeOptions = useMemo(
        () =>
            (product?.availableSizes || []).map((sizeValue) => ({
                id: sizeValue,
                size: sizeValue,
            })),
        [product]
    );

    const colorOptions = useMemo(
        () =>
            (product?.availableColors || []).map((colorValue) => ({
                id: colorValue,
                color: colorValue,
            })),
        [product]
    );

    if (isLoading) {
        return (
            <Container>
                <Text>Loading product...</Text>
            </Container>
        );
    }

    if (error || !product) {
        return (
            <Container>
                <Text>{error || "Product not found"}</Text>
            </Container>
        );
    }

    return (
        <>
            <section>
                <Container>
                    <BreadCrumbs />
                </Container>
            </section>
            <section>
                <Container>
                    <Styled.Box>
                        <ImageViewer images={product.images} title={product.name} />
                        <Styled.Data>
                            <Styled.Title>{product.name}</Styled.Title>
                            <Text>{product.price} грн</Text>
                            <Styled.Desc>{product.description}</Styled.Desc>
                            <Styled.BuyItems>
                                <SizePicker
                                    items={sizeOptions}
                                    selected={selectedSize}
                                    onSelect={setSelectedSize}
                                    itemHeight="52px"
                                    itemWidth="52px"
                                />
                                <ColorPicker
                                    items={colorOptions}
                                    selected={selectedColor}
                                    onSelect={setSelectedColor}
                                    itemHeight="52px"
                                    itemWidth="52px"
                                />
                                <CartButton
                                    product={{
                                        id: product.id,
                                        image: product.images[0],
                                        name: product.name,
                                        price: product.price,
                                    }}
                                    selectedColor={selectedColor}
                                    selectedSize={selectedSize}
                                    styleVariant={product.cardVariant}
                                />
                            </Styled.BuyItems>
                        </Styled.Data>
                    </Styled.Box>
                </Container>
            </section>
        </>
    );
};

export default Product;
