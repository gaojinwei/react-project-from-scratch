const path = require("path");
const webpack = require("webpack");
//需安装的插件
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
//https://github.com/jharris4/html-webpack-include-assets-plugin
var HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
//var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const readdir = require("./node-utils/readdir");

const entriesPath = path.resolve(__dirname, "./src/entries");
const entryPaths = readdir(entriesPath);
const templatePath = path.resolve(__dirname, "./public/index.html");
const publicPath = path.resolve(__dirname, "./public");
const distPath = path.resolve(__dirname, "./dist");

let entry = {};
let HtmlWebpackPlugins = [];

entryPaths.forEach(entryPath => {
  //bundle入口文件名
  const name = path.basename(entryPath, ".js");
  entry[name] = `./${name}.js`;

  const htmlWebpackPluginConfig = {
    template: templatePath,
    //帮助在dist目录生成html
    filename: `html/${name}.html`,
    //并通知自动引入哪些bundle
    //issue: 不自动引入该chunk应该包含的code splitting生成的js文件
    //解决：https://github.com/jantimon/html-webpack-plugin/issues/968 大神威武。。
    chunks: [`${name}`]
  };
  HtmlWebpackPlugins.push(new HtmlWebpackPlugin(htmlWebpackPluginConfig));
});

//注：entry和output本身跟html没有关系，可在html中手动引入js，或使用html-webpack-plugin自动化
module.exports = {
  //入口文件路径
  context: path.resolve(__dirname, "src/entries"),
  //entry: "./src/index.js",
  //entry,
  module: {
    rules: [
      //通知webpack使用babel，而不是手动命令行编译
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
        //已经使用.babelrc，没必要再用options指定presets
        //options: { presets: ["@babel/preset-env"] }
      },
      //处理css
      {
        test: /\.css$/,
        //多个loader使用use来指定
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              outputPath: "images"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              pngquant: {
                quality: "20",
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              //默认dist目录
              outputPath: "font"
            }
          }
        ]
      }
    ]
  },
  //import modules不用再添加扩展名
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    //指定assets生成到哪
    path: path.resolve(__dirname, "dist/"),
    //publicPath: "/dist/",
    //html中refer其他assets的相对路径，server根目录
    publicPath: "/",
    filename: "js/[name].[contenthash].js"
  },
  optimization: {
    splitChunks: {
      //这里production环境中每次只允许build一个页面，不用生成各页面共用的js
      //chunks: "all",
      //避免生成的split chunks文件名太长，默认多个entry共有的js文件名会用所有共享entry名连接起来
      //name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|styled-components)[\\/]/,
          name: "vendor",
          chunks: "all"
        },
        regionMap: {
          test(module, chunks) {
            return module.resource.endsWith("tz_region_zh_CN_parsed.js");
          },
          name: "regionMap",
          chunks: "all"
        }
      }
    },
    runtimeChunk: "single"
  },
  //需要额外配置才能生效，如果没有，浏览器不再自动刷新
  //plugins: [new webpack.HotModuleReplacementPlugin()]
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new CopyPlugin([
      {
        //需要指定绝对路径，否则按照context路径
        from: `${publicPath}/normalize.css`,
        to: `${distPath}/css`
      }
    ]),
    /* new OptimizeCssAssetsPlugin({
      //assetNameRegExp: /css\/\.normalize\.css$/g
    }), */
    //...HtmlWebpackPlugins,
    //与copy-webpack-plugin及html-webpack-plugin配合使用，将复制的assets自动引入到生成的html中
    new HtmlWebpackIncludeAssetsPlugin({
      //与html-webpack-plugin一样参照dist目录
      assets: ["css/normalize.css"],
      append: false
    }),
    new webpack.HashedModuleIdsPlugin()
    //new BundleAnalyzerPlugin()
  ]
};
