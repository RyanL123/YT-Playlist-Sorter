import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  eslintConfigPrettier,
  {
    ignores: ["build/"],
    plugins: {
      eslintPluginImport,
    },
    rules: {
      "sort-imports": "error",
      "eslintPluginImport/order": "error",
    },
  },
];
