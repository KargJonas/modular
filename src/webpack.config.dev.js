const path = require("path");
const package = require("./../dist/package.json");
const webpack = require("requireg")("webpack");

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
  entry: path.resolve(__dirname, "dev/modular.dev.js"),

  output: {
    library: "Modular",
    path: path.resolve(__dirname, "../dist"),
    filename: "modular.dev.js"
  }
}