const path = require("path");

module.exports = {
    mode: "development",
    // mode: "production",
    entry: path.resolve(__dirname, "dev/modular.js"),
    output: {
        path: path.resolve(__dirname, "test"),
        filename: "modular.bundle.js"
    }
};