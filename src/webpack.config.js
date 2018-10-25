const path = require("path");
const package = require("./../dist/package.json");

// can't get this to work with local webpack
const webpack = require("requireg")("webpack");

const modular_conf = {
  // mode: "development",
  mode: "production",
  entry: path.resolve(__dirname, "dev/modular.js"),

  output: {
    library: "Modular",
    path: path.resolve(__dirname, "../dist"),
    filename: "modular.js"
  },

  watchOptions: {
    poll: true
  },

  plugins: [
    new webpack.BannerPlugin(`Modular V${ package.version } by Jonas Karg 2018`)
  ]
}

const modular_dev_conf = {
  // mode: "development",
  mode: "production",
  entry: path.resolve(__dirname, "dev/modular.dev.js"),

  output: {
    library: "Modular",
    path: path.resolve(__dirname, "../dist"),
    filename: "modular.dev.js"
  },

  watchOptions: {
    poll: true
  },

  plugins: [
    new webpack.BannerPlugin(`Modular V${ package.version } by Jonas Karg 2018`)
  ]
}

module.exports = [
  modular_conf,
  modular_dev_conf
];