const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
          options: {
            jsonLimit: "20mb", // Increase the limit to 20MB
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[hash].[ext]",
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.ico$/,
          use: "file-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        inject: "body",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(argv.mode),
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "public/assets", to: "assets" }],
      }),
      isProduction &&
        new CompressionWebpackPlugin({
          algorithm: "gzip",
        }),
      isProduction &&
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
        }),
      new HotModuleReplacementPlugin(), // Add this plugin
    ].filter(Boolean), // Filter out false values
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      hot: true, // Enable hot module replacement
      port: 9000,
      open: true,
    },
  };
};
