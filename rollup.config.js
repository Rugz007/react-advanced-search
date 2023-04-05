import { babel } from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import scss from "rollup-plugin-scss";
const packageJson = require("./package.json");

export default [
  {
    input: "./src/index.ts",
    external: [
      "react",
      "react-dom",
      "zustand",
      "zustand/shallow",
      "zustand/context",
      (id) => id.includes("@babel/runtime"),
    ],

    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.main,
        format: "esm",
        exports: "named",
        sourcemap: true,
      },
    ],
    plugins: [
      scss({
        output: true,
        failOnError: true,
        outputStyle: "compressed",
      }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
      }),
      external(),
      resolve(),
      typescript({ useTsconfigDeclarationDir: true }),
      terser(),
    ],
  },
];
