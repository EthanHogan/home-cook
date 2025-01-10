/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  importOrder: [
    "^@core/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@server/(.*)$",
    "^@ui/(.*)$",
    "^[./]",
  ],
};

export default config;
