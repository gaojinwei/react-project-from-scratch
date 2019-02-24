const path = require("path");

const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  //运行development server时不用再添加mode flag
  //从webpack v4开始，mode自动配置了DefinePlugin，key: process.env.NODE_ENV，value: 指定的mode
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    //contentBase: path.join(__dirname, "public/"),
    contentBase: path.join(__dirname, "dist/"),
    port: 3000,
    //不指定会假设bundle files在根目录（待验证）
    //publicPath: "http://localhost:3000/dist/",
    //hotOnly: true,
    writeToDisk: true
  }
});
