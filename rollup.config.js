import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

const input = "src/index.js";

export default [
  {
    input,
    output: {
      file: pkg.browser,
      format: "umd",
      name: "Remember",
      sourcemap: process.env.NODE_ENV === "dev",
    },
    plugins: [
      resolve(),
      babel({
        exclude: ["node_modules/**"],
      }),
      terser(),
    ],
  },
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**']
      })
    ]
  }
];
