const defaultColors = {};

export const colors = {
    light: {
        ...defaultColors,
        background: "#ffffff",
        foreground: "#262626",
        border: "#cee2f7",
        input: "#cee2f7",
        ring: "#cee2f7",
        primary: {
            DEFAULT: "#384899",
            foreground: "#d6d6d6",
        },
        secondary: {
            DEFAULT: "#5076a3",
            foreground: "#384899",
        },
        destructive: {
            DEFAULT: "#ff5c3e",
            foreground: "#d6d6d6",
        },
        muted: {
            DEFAULT: "#5076a3",
            foreground: "#36416d",
        },
        accent: {
            DEFAULT: "#5076a3",
            foreground: "#384899",
        },
        popover: {
            DEFAULT: "#ffffff",
            foreground: "#262626",
        },
        card: {
            DEFAULT: "#ffffff",
            foreground: "#262626",
        },
    },
    dark: {
        ...defaultColors,
        background: "#050505",
        foreground: "#fafafa",
        border: "#2b2b2b",
        input: "#2b2b2b",
        ring: "#d5a8b3",
        primary: {
            DEFAULT: "#384899",
            foreground: "#d6d6d6",
        },
        secondary: {
            DEFAULT: "#b4a09c",
            foreground: "#fafafa",
        },
        destructive: {
            DEFAULT: "#9d4e33",
            foreground: "#fafafa",
        },
        muted: {
            DEFAULT: "#b4a09c",
            foreground: "#ae3367",
        },
        accent: {
            DEFAULT: "#b4a09c",
            foreground: "#fafafa",
        },
        popover: {
            DEFAULT: "#050505",
            foreground: "#fafafa",
        },
        card: {
            DEFAULT: "#050505",
            foreground: "#fafafa",
        },
    },
};

export type Theme = keyof typeof colors;

export const defaultTheme: Theme = "light";
