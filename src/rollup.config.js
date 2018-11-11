import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";

const banner = `/** @license Modular-UI
* Copyright (c) ${ (new Date()).getFullYear() } Jonas Karg
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/`;
const plugins = [
  nodeResolve({
    jsnext: true,
    main: true
  }),

  commonjs({
    extensions: [".js"],
    ignoreGlobal: false,
    sourceMap: false,
    ignore: ["conditional-runtime-dependency"]
  })
];

export default [
  {
    plugins,
    input: "dev/modular.js",
    output: {
      file: "../dist/modular.js",
      format: "iife",
      name: "Modular",
      banner
    }
  },
  {
    plugins,
    input: "dev/modular.js",
    output: {
      file: "../dist/modular.cjs.js",
      format: "iife",
      name: "Modular",
      footer: "module.exports = Modular;",
      banner
    }
  },
  {
    plugins,
    input: "dev/modular.js",
    output: {
      file: "../dist/modular.es.js",
      format: "iife",
      name: "Modular",
      footer: "export default Modular;",
      banner
    }
  }
];