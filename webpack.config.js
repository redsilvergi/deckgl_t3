const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "./src", "index.html"),
    }),
  ],
  output: { path: path.resolve(__dirname, "./dist"), filename: "main.js" },
  entry: { index: path.resolve(__dirname, "./src", "index.js") },
};
