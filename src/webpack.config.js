const path = require( "path" );
const package = require( "./../dist/package.json" );
const webpack = require( "requireg" )( "webpack" );

module.exports = {
  // mode: "development",
  mode: "production",
  entry: path.resolve( __dirname, "dev/modular.js" ),
  output: {
    path: path.resolve( __dirname, "test" ),
    filename: "modular.bundle.js"
  },
  watchOptions: {
    poll: true
  },
  plugins: [
    new webpack.BannerPlugin(`Modular V${package.version} by Jonas Karg 2018`)
  ]
};