/** @type {import("prettier").Config} */

module.exports = {
    ...require("common/prettierrc.cjs"),
    plugins: ["prettier-plugin-tailwindcss"],
};
