const path = require("path");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "dev/modular-2.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "modular-2.bundle.js"
    }
};