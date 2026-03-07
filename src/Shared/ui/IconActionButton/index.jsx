import Styled from "./styled";

const IconActionButton = ({
    as,
    ariaLabel,
    height,
    href,
    icon,
    iconSize,
    isActive = false,
    onClick,
    rel,
    size,
    target,
    title,
    type = "button",
    variant = "classic",
    width,
}) => {
    const isLink = as === "a";

    return (
        <Styled.Box
            as={as}
            type={isLink ? undefined : type}
            href={isLink ? href : undefined}
            target={isLink ? target : undefined}
            rel={isLink ? rel : undefined}
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
        </Styled.Box>
    );
};

export default IconActionButton;
