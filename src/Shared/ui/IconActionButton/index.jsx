import Button from "@shared/ui/Button";

const IconActionButton = ({
    as,
    ariaLabel,
    height,
    href,
    icon,
    iconSize,
    isActive = false,
    disabled = false,
    onClick,
    rel,
    size,
    target,
    title,
    type = "button",
    variant = "classic",
    width,
}) => {
    return (
        <Button
            as={as}
            type={type}
            href={href}
            target={target}
            rel={rel}
            onClick={onClick}
            disabled={disabled}
            isActive={isActive}
            variant={variant}
            size={size}
            width={width}
            height={height}
            ariaLabel={ariaLabel}
            title={title || ariaLabel}
            icon={icon}
            iconSize={iconSize}
        >
            {null}
        </Button>
    );
};

export default IconActionButton;
