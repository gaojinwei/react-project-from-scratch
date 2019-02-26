const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

const inquirer = require("inquirer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//const common = require("./webpack.common.js");
const common = require("./webpack.prod.common.js");

//var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const readdir = require("./node-utils/readdir");

const entriesPath = path.resolve(__dirname, "./src/entries");
const templatePath = path.resolve(__dirname, "./public/index.html");
const entryPaths = readdir(entriesPath);

class BuildPage {
  constructor(pagePath) {
    //entry路径
    this.pagePath = pagePath;
    this.pageName = path.basename(pagePath, ".js");
  }
}

const buildPages = entryPaths.map(path => new BuildPage(path));

inquirer
  .prompt([
    {
      type: "list",
      name: "page",
      message: "选择要生成的页面",
      choices: buildPages.map(page => page.pageName)
    }
  ])
  .then(({ page }) => {
    let pagePath = `./${page}.js`;
    return { page, pagePath };
  })
  .then(({ page, pagePath }) => {
    let entry = {};
    entry[page] = pagePath;
    console.log(entry);

    const htmlWebpackPluginConfig = {
      template: templatePath,
      //帮助在dist目录生成html
      filename: `html/${page}.html`,
      //并通知自动引入哪些bundle
      //issue: 不自动引入该chunk应该包含的code splitting生成的js文件
      //解决：https://github.com/jantimon/html-webpack-plugin/issues/968 大神威武。。
      chunks: [`${page}`]
    };

    const webpackConfig = merge(common, {
      entry,
      plugins: [new HtmlWebpackPlugin(htmlWebpackPluginConfig)],
      mode: "production",
      devtool: "source-map"
    });

    webpack(webpackConfig, (err, stats) => {});
  })
  .then(() => console.log("build success"))
  .catch(error => console.log(error));

// module.exports = merge(common, {
//   mode: "production",
//   devtool: "source-map"
//   //   optimization: {
//   //     minimizer: [
//   //       /*  new UglifyJsPlugin({
//   //         cache: true,
//   //         parallel: true,
//   //         sourceMap: true // set to true if you want JS source maps
//   //       }), */
//   //       new OptimizeCssAssetsPlugin({})
//   //     ]
//   //   }
// });
