const path = require("path");
const package = require("./package.json");
const webpack = require("requireg")("webpack");
const devBuild = process.argv.indexOf('--dev') !== -1;
const min = process.argv.indexOf('--min') !== -1;

const filename = devBuild ? "modular.dev.js" : "modular.js";
const minPath = min ? "/min" : "";

const mode = "production";
const banner = new webpack.BannerPlugin({
  raw: true,
  banner:
    `/** @license Modular V${ package.version }
 * Copyright (c) ${ (new Date()).getFullYear() } Jonas Karg
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */`
});

module.exports = {
  mode: mode,
  watchOptions: { poll: true },
  plugins: [banner],
  entry: {
    path: path.resolve(__dirname, "dev"),
    filename: filename
  },
  output: {
    library: "Modular",
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, `../dist${ minPath }`),
    filename: filename
  },
  optimization: {
    minimize: min
  },
  target: "web"
};