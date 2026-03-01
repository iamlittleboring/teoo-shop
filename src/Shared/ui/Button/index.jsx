import IconActionButton from "@shared/ui/IconActionButton";

const Button = ({
    ariaLabel,
    height = "auto",
    icon,
    isActive = false,
    onClick,
    title,
    type = "button",
    variant = "classic",
    width = "auto",
}) => {
    return (
        <IconActionButton
            ariaLabel={ariaLabel}
            height={height}
            icon={icon}
            isActive={isActive}
            onClick={onClick}
            title={title}
            type={type}
            variant={variant}
            width={width}
        />
    );
};

export default Button;
