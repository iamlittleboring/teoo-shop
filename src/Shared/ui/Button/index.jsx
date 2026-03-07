import IconActionButton from "@shared/ui/IconActionButton";

const Button = ({
    as,
    ariaLabel,
    height = "auto",
    href,
    icon,
    isActive = false,
    onClick,
    rel,
    target,
    title,
    type = "button",
    variant = "classic",
    width = "auto",
}) => {
    return (
        <IconActionButton
            as={as}
            ariaLabel={ariaLabel}
            height={height}
            href={href}
            icon={icon}
            isActive={isActive}
            onClick={onClick}
            rel={rel}
            target={target}
            title={title}
            type={type}
            variant={variant}
            width={width}
        />
    );
};

export default Button;
