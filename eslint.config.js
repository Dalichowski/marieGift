import globals from "globals";
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import eslintAutoImport from "./.eslintrc-auto-import.cjs";
import prettierPlugin from "eslint-plugin-prettier/recommended";

export default [
  { ignores: ["dist/"] },
  js.configs.recommended,
  {
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "off" : "warn",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-setter-return": "off",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-prototype-builtins": "off"
    }
  },
  {
    files: ["**/*.cjs"],
    languageOptions: { globals: globals.node },
    rules: { "no-console": "off" }
  },
  {
    files: ["*.js", "vitePlugins/*.js"],
    languageOptions: { globals: globals.nodeBuiltin },
    rules: { "no-console": "off" }
  },
  {
    files: ["**/*.js", "**/*.vue"],
    languageOptions: {
      globals: { ...globals.browser, ...eslintAutoImport.globals }
    }
  },
  prettierPlugin,
  {
    rules: {
      "prettier/prettier": [
        "warn",
        { trailingComma: "none", arrowParens: "avoid" }
      ]
    }
  },
  ...pluginVue.configs["flat/strongly-recommended"],
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-reserved-component-names": "off",
      "vue/max-attributes-per-line": "off",
      "vue/no-template-shadow": "off",
      "vue/one-component-per-file": "off",
      "vue/require-explicit-emits": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/require-default-prop": "off",
      "vue/v-on-event-hyphenation": ["error", "never"],
      "vue/component-tags-order": [
        "warn",
        { order: ["template", "script", "style"] }
      ],
      "vue/no-lone-template": "warn",
      "vue/order-in-components": "warn",
      "vue/this-in-template": "error",
      "vue/block-tag-newline": "warn",
      "vue/component-name-in-template-casing": [
        "warn",
        "PascalCase",
        {
          registeredComponentsOnly: false,
          ignores: ["component", "transition", "fa"]
        }
      ],
      "vue/component-options-name-casing": "warn",
      "vue/custom-event-name-casing": "error",
      "vue/no-empty-component-block": "warn",
      "vue/no-ref-object-destructure": "error",
      "vue/no-required-prop-with-default": "warn",
      "vue/no-template-target-blank": "error",
      "vue/no-this-in-before-route-enter": "error",
      "vue/no-unsupported-features": ["error", { version: "^3.4.0" }],
      "vue/no-unused-properties": "warn",
      "vue/no-unused-refs": "warn",
      "vue/no-useless-mustaches": "warn",
      "vue/no-useless-v-bind": "warn",
      "vue/padding-line-between-blocks": "warn",
      "vue/prefer-separate-static-class": "error",
      "vue/prefer-true-attribute-shorthand": "warn",
      "vue/v-for-delimiter-style": "warn",
      "vue/attribute-hyphenation": ["warn", "never"],
      "vue/html-self-closing": ["warn", { html: { void: "always" } }],

      // conflict with prettier html-whitespace-sensitivity rule
      // which is smarter regarding inline elements
      "vue/html-closing-bracket-newline": "off",
      "vue/html-indent": "off"
    }
  }
];
