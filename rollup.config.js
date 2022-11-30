const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");
const { defineConfig } = require("rollup");
const { default: dts } = require("rollup-plugin-dts");
const { default: swc } = require("rollup-plugin-swc3");

module.exports = defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs",
        format: "cjs",
        exports: "named",
      },
      {
        file: "dist/index.mjs",
        format: "esm",
        exports: "named",
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      swc({
        minify: true,
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
]);
