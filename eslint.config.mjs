import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";

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
      "eslintPluginImport/order": "error",
    },
  },
];
