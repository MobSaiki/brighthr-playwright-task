const playwright = require("eslint-plugin-playwright");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      playwright,
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Playwright best practices
      "playwright/no-page-pause": "error",
      "playwright/no-wait-for-timeout": "error",

      // TS-friendly unused var check (avoid duplicate with base rule)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
];
