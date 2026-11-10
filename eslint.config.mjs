import { defineConfig, globalIgnores } from "eslint/config";
import * as mdx from "eslint-plugin-mdx";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import localMdx from "./tools/eslint-rules/index.mjs";

// eslint-config-next registers eslint-plugin-react for JS/TS files only.
// Reuse the same plugin instance so MDX files can run its rules too.
const reactPlugin = nextVitals.find((config) => config.plugins?.react)?.plugins
  .react;

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ...mdx.flat,
    files: ["**/*.{md,mdx}"],
  },
  {
    files: ["**/*.mdx"],
    plugins: {
      "local-mdx": localMdx,
      ...(reactPlugin ? { react: reactPlugin } : {}),
    },
    rules: {
      "local-mdx/mdx-typecheck": "error",
      // Components imported into MDX are used as JSX in the body; without
      // this, no-unused-vars reports every such import as unused.
      ...(reactPlugin ? { "react/jsx-uses-vars": "error" } : {}),
    },
  },
  {
    files: ["diary/*.mdx"],
    rules: {
      "local-mdx/diary-entry-metadata": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
