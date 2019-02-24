1. npm init 生成 package.json
2. git init
3. 添加.gitignore
4. 添加 src 和 public 文件夹，public 存放所有静态文件，包括 index.html
5. 安装 compiler：npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react
   - @babel/cli 用来以命令行的形式编译文件
   - @babel/preset-env 用来转换 ES6+语法
   - @babel/preset-react 用来转换 JSX 语法
6. 设置 compiler：添加.babelrc，通知 babel 使用哪些 presets，关于增加的 plugins：https://babeljs.io/docs/en/next/babel-plugin-transform-runtime
7. 安装 bundler：npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader
8. 添加 webpack.config.js
9. 添加 react 依赖包: npm install react react-dom(如果要指定版本，包名后加@然后版本号)
10. 添加 clean-webpack-plugin，每次 build 前清空 output 目录：npm install --save-dev clean-webpack-plugin
