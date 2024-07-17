const defaultColors = {};

export const colors = {
    light: {
        ...defaultColors,
        background: "#ffffff",
        foreground: "#0F0E21",
        border: "#E9EEF2",
        input: "#E9EEF2",
        ring: "#99A6B2",
        primary: {
            DEFAULT: "#0F0E21",
            foreground: "#F8FAFC",
        },
        secondary: {
            DEFAULT: "#EBF1F5",
            foreground: "#0F0E21",
        },
        destructive: {
            DEFAULT: "#FF0000",
            foreground: "#F8FAFC",
        },
        muted: {
            DEFAULT: "#EBF1F5",
            foreground: "#6B7885",
        },
        accent: {
            DEFAULT: "#EBF1F5",
            foreground: "#0F0E21",
        },
        popover: {
            DEFAULT: "#FFFFFF",
            foreground: "#0F0E21",
        },
        card: {
            DEFAULT: "#FFFFFF",
            foreground: "#0F0E21",
        },
    },
};

export type Theme = keyof typeof colors;

export const defaultTheme: Theme = "light";
