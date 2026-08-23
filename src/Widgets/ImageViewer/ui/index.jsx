import { useRef, useState } from "react";

import { computeZoomPosition } from "../lib/zoom-position";
import Styled from "./styled";

const ImageViewer = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [clickedImage, setClickedImage] = useState(0);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);

    const sliderRef = useRef();

    const handleOnMouseEnter = (index) => {
        setCurrentImage(index);
    };

    const handleOnMouseLeave = () => {
        setIsZoomed(false);
        if (!clickedImage) {
            setCurrentImage(0);
        } else {
            setCurrentImage(clickedImage);
        }
    };

    const handleOnClick = (index) => {
        setClickedImage(index);
        setCurrentImage(index);
    };

    const handleOnMouseMove = (e) => {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const { width, height } = target;

        setZoomPosition(computeZoomPosition({ offsetX, offsetY, width, height }));
        setIsZoomed(true);
    };

    const handleScroll = (direction) => {
        const slider = sliderRef.current;
        const scrollAmount = slider.clientWidth;

        if (direction === "left") {
            slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else if (direction === "right") {
            slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    // With fewer than 4 photos the whole row fits without scrolling, so the
    // nav arrows would have nothing to do — hide them instead of leaving
    // dead controls in the UI.
    const showNav = images.length >= 4;

    return (
        <Styled.Box>
            <Styled.MainImageBlock
                onMouseMove={handleOnMouseMove}
                onMouseLeave={handleOnMouseLeave}
            >
                <Styled.MainImage
                    src={images[currentImage]}
                    alt="product image"
                    style={{
                        transform: isZoomed ? "scale(2)" : "scale(1)",
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }}
                />
            </Styled.MainImageBlock>
            <Styled.List>
                {showNav && (
                    <Styled.ListButton
                        className="left"
                        onClick={() => handleScroll("left")}
                    >
                        {"<"}
                    </Styled.ListButton>
                )}
                <Styled.ListInner ref={sliderRef}>
                    {images.map((image, index) => (
                        <Styled.ListImage
                            key={index}
                            src={image}
                            alt="List Image"
                            onMouseEnter={() => handleOnMouseEnter(index)}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={() => handleOnClick(index)}
                            $clicked={clickedImage === index}
                        />
                    ))}
                </Styled.ListInner>
                {showNav && (
                    <Styled.ListButton
                        className="right"
                        onClick={() => handleScroll("right")}
                    >
                        {">"}
                    </Styled.ListButton>
                )}
            </Styled.List>
        </Styled.Box>
    );
};

export default ImageViewer;
