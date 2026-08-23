import Styled from "./styled";

const Button = ({
    as,
    ariaLabel,
    appearance,
    children,
    disabled = false,
    height,
    href,
    icon,
    iconPosition = "start",
    iconSize,
    isActive = false,
    onClick,
    rel,
    size = "s",
    target,
    title,
    to,
    type = "button",
    variant = "classic",
    width,
    ...props
}) => {
    const isButtonElement = !href && !to && (!as || as === "button");
    const hasText = Boolean(children);

    return (
        <Styled.Box
            as={as || (href ? "a" : "button")}
            type={isButtonElement ? type : undefined}
            href={href}
            to={isButtonElement ? undefined : to}
            target={isButtonElement ? undefined : target}
            rel={isButtonElement ? undefined : rel}
            onClick={onClick}
            disabled={isButtonElement ? disabled : undefined}
            aria-label={ariaLabel}
            title={title || ariaLabel}
            $active={isActive}
            $variant={variant}
            $appearance={appearance}
            $size={size}
            $hasText={hasText}
            $width={width}
            $height={height}
            {...props}
        >
            {icon ? (
                <Styled.Icon
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    $active={isActive}
                    $iconSize={iconSize}
                    $size={size}
                    $hasText={hasText}
                />
            ) : null}
            {children ? (
                <Styled.Label $iconPosition={iconPosition}>{children}</Styled.Label>
            ) : null}
        </Styled.Box>
    );
};

export default Button;
