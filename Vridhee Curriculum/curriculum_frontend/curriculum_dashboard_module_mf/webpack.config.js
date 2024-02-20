const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
var webpack = require('webpack');

const fs = require('fs');

require('dotenv').config()

const config= fs.readFileSync("./configuration.json");
let configjson = JSON.parse(config);

let config_details = process.env.NODE_ENV.toString() == "local" ? configjson.local : configjson.server
console.log(config_details, "config_details")

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    // publicPath: "http://localhost:5040/",
    publicPath: config_details.curriculumDashboardMFUrl
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 5040,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "curriculum_dashboard_module_mf",
      filename: "remoteEntry.js",
      remotes: {
        vridhee_common_component_mf: `vridhee_common_component_mf@${config_details.commonMFUrl}remoteEntry.js`,
        vridhee_account_mf: `vridhee_account_mf@${config_details.accountMFUrl}remoteEntry.js`,
      },
      exposes: {

      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({
      // 'process.env.LOCAL_API_GATEWAY_URL': JSON.stringify(process.env.LOCAL_API_GATEWAY_URL),
      'process.env.REACT_ENV': JSON.stringify(process.env.REACT_ENV),
      // 'process.env.SERVER_API_GATEWAY_URL': JSON.stringify(process.env.SERVER_API_GATEWAY_URL),
      // ...
    }),
  ],
});
