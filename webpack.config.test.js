const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

describe("Webpack Configuration", () => {
  test("entry point is correct", () => {
    const config = webpackConfig({}, { mode: "development" });
    expect(config.entry).toBe("./src/index.js");
  });

  test("output path and filename are correct", () => {
    const config = webpackConfig({}, { mode: "development" });
    expect(config.output.path).toBe(path.resolve(__dirname, "dist"));
    expect(config.output.filename).toBe("bundle.js");
    expect(config.output.publicPath).toBe("/");
  });

  test("contains the necessary plugins", () => {
    const config = webpackConfig({}, { mode: "development" });
    const pluginNames = config.plugins.map(
      (plugin) => plugin.constructor.name
    );

    expect(pluginNames).toContain("CleanWebpackPlugin");
    expect(pluginNames).toContain("HtmlWebpackPlugin");
    expect(pluginNames).toContain("MiniCssExtractPlugin");
    expect(pluginNames).toContain("DefinePlugin");
    expect(pluginNames).toContain("CopyPlugin");
    expect(pluginNames).toContain("HotModuleReplacementPlugin");
  });

  test("loads JS and JSX files with babel-loader", () => {
    const config = webpackConfig({}, { mode: "development" });
    const babelRule = config.module.rules.find(
      (rule) => rule.test.toString() === /\.(js|jsx)$/.toString()
    );
    expect(babelRule).toBeTruthy();
    expect(babelRule.use).toBe("babel-loader");
  });

  test("loads CSS files with style-loader and css-loader", () => {
    const config = webpackConfig({}, { mode: "development" });
    const cssRule = config.module.rules.find(
      (rule) => rule.test.toString() === /\.css$/.toString()
    );
    expect(cssRule).toBeTruthy();
    const useLoaders = cssRule.use.map((loader) => loader.loader || loader);
    expect(useLoaders).toContain("style-loader");
    expect(useLoaders).toContain("css-loader");
  });

  test("loads image files with file-loader", () => {
    const config = webpackConfig({}, { mode: "development" });
    const imageRule = config.module.rules.find(
      (rule) =>
        rule.test.toString() === /\.(png|jpe?g|gif|svg)$/.toString()
    );
    expect(imageRule).toBeTruthy();
    expect(imageRule.use[0].loader).toBe("file-loader");
  });
});
