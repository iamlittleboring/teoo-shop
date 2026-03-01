import Styled from "./styled";

const IconActionButton = ({
    ariaLabel,
    height,
    icon,
    iconSize,
    isActive = false,
    onClick,
    showActiveDot = false,
    size,
    title,
    type = "button",
    variant = "classic",
    width,
}) => {
    return (
        <Styled.Box
            type={type}
            onClick={onClick}
            $active={isActive}
            $variant={variant}
            $size={size}
            $width={width}
            $height={height}
            aria-label={ariaLabel}
            title={title || ariaLabel}
        >
            <Styled.Icon
                src={icon}
                alt=""
                aria-hidden="true"
                $active={isActive}
                $iconSize={iconSize}
            />
            {showActiveDot && isActive && <Styled.ActiveDot aria-hidden="true" />}
        </Styled.Box>
    );
};

export default IconActionButton;
