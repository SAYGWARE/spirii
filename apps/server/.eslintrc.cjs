const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
    plugins: ["import"],
    extends: ["@vercel/style-guide/eslint/node", "@vercel/style-guide/eslint/typescript"].map(require.resolve),
    parserOptions: {
        project,
    },
    globals: {
        React: true,
        JSX: true,
    },
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: ["node_modules/", "dist/"],
    rules: {
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "no-console": "off",
        "import/no-named-as-default": "off",
        "no-empty-pattern": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
    },
};
