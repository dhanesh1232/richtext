import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

export default [
  // 1️⃣ JS builds
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({ extensions: [".js", ".ts", ".tsx"] }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.build.json",
        declaration: false, // 🚫 Turn off declarations here
        emitDeclarationOnly: false,
      }),
      postcss({
        extract: true,
        minimize: true,
        sourceMap: true,
      }),
    ],
  },

  // 2️⃣ Type bundling
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
