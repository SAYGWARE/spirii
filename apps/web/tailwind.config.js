/** @type {import('tailwindcss').Config} */

const { createThemes } = require("tw-colors");
const { colors, screens, borderRadius, defaultTheme } = require("./theme");

module.exports = {
    content: [`src/**/*.{ts,tsx}`, "../../packages/**/*.{ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens,
        },
        extend: {
            borderRadius,
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [
        createThemes(colors, {
            defaultTheme,
        }),
        require("tailwindcss-animate"),
    ],
};
