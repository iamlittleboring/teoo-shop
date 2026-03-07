const baseUiTokens = {
    accents: {
        classic: "#ea5b2a",
        street: "#ffc285",
        clean: "#1f7af0",
    },
    iconButton: {
        borderLight: "rgba(0, 0, 0, 0.14)",
        borderDark: "rgba(255, 255, 255, 0.18)",
        bgLight: "rgba(255,255,255,0.72)",
        bgDark: "rgba(255,255,255,0.08)",
        activeGradientTo: "#171819",
        shadow: "0 8px 18px rgba(0, 0, 0, 0.08)",
        activeShadow: "0 10px 18px rgba(0, 0, 0, 0.24)",
        hoverShadow: "0 12px 22px rgba(0, 0, 0, 0.16)",
    },
    productCard: {
        borderLight: "rgba(0, 0, 0, 0.08)",
        borderDark: "rgba(255, 255, 255, 0.14)",
        buyBorder: "rgba(0, 0, 0, 0.08)",
        badgeText: "#fff",
        badgeBg: {
            classic: "rgba(23,24,25,0.86)",
            street: "rgba(234,91,42,0.92)",
            clean: "rgba(31,122,240,0.92)",
        },
        hoverShadow: "0 18px 40px rgba(0, 0, 0, 0.14)",
        codeOpacity: 0.55,
        descOpacity: 0.78,
        priceLabelOpacity: 0.55,
    },
    panel: {
        border: "rgba(0, 0, 0, 0.12)",
        bgLight: "rgba(255,255,255,0.9)",
        bgDark: "rgba(255,255,255,0.04)",
        danger: "#d03f3f",
        dangerHoverBg: "rgba(208, 63, 63, 0.07)",
    },
    modal: {
        overlayBg: "rgba(0, 0, 0, 0.5)",
        bgLight: "#fff",
        bgDark: "#171819",
        closeBorder: "rgba(0, 0, 0, 0.22)",
    },
    bottomNav: {
        bgLight: "#fff",
        bgDark: "#171819",
    },
    input: {
        borderBottom: "#ececec",
    },
    imageViewer: {
        navButtonColor: "#fff",
    },
    cartItem: {
        dotBorder: "#c8c8c8",
        counterBorder: "rgba(0, 0, 0, 0.2)",
    },
    picker: {
        selectedOverlay: "rgba(0, 0, 0, 0.1)",
        checkIcon:
            "url('data:image/svg+xml;charset=UTF-8,<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 11.917L9.724 16.5L19 7.5\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>') center center no-repeat",
    },
};

const darkTheme = {
    mode: "dark",
    colors: {
        text: "#fff",
        bg: "#171819",
    },
    shadow: "0px 0px 36.2px 11px rgba(255, 255, 255, 0.12)",
    activeShadow: "0px 0px 36.2px 11px rgba(255, 255, 255, 0.26)",
    ui: {
        ...baseUiTokens,
        iconButton: {
            ...baseUiTokens.iconButton,
            activeGradientTo: "#171819",
        },
    },
};

const lightTheme = {
    mode: "light",
    colors: {
        text: "#000",
        bg: "#fff",
    },
    shadow: "0px 0px 36.2px 11px rgba(0, 0, 0, 0.12)",
    activeShadow: "0px 0px 36.2px 11px rgba(0, 0, 0, 0.26)",
    ui: {
        ...baseUiTokens,
        iconButton: {
            ...baseUiTokens.iconButton,
            activeGradientTo: "#ffffff",
        },
    },
};

export { darkTheme, lightTheme };
