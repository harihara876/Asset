const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const fs = require('fs');
var webpack = require('webpack');
require('dotenv').config()

const config = fs.readFileSync("./configuration.json");
let configjson = JSON.parse(config);
let config_details = process.env.NODE_ENV.toString() == "local" ? configjson.local : configjson.server
console.log(config_details, "config_details")

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  mode: 'development',

  output: {
    // publicPath: "http://localhost:5010/",
    publicPath: config_details.commonMFUrl
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 5010,
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
      name: "vridhee_common_component_mf",
      filename: "remoteEntry.js",
      remotes: {
        vridhee_account_mf: `vridhee_account_mf@${config_details.accountMFUrl}remoteEntry.js`,
        curriculum_onboarding_mf: `curriculum_onboarding_mf@${config_details.onboardingMFUrl}remoteEntry.js`,
      },
      exposes: {
        "./AppButton": "./src/Components/button.tsx",
        "./AppInput": "./src/Components/input.tsx",
        "./Header": "./src/Layouts/header.tsx",
        "./Checbox": "./src/Components/checkbox.tsx",
        "./AppTextarea": "./src/Components/textarea.tsx",
        "./Checbox": "./src/Components/checkbox.tsx",
        "./Dropdown": "./src/Components/dropdown.tsx",
        "./AutocompleteSearch": "./src/Components/autocomplete.tsx",
        "./configJson": "./src/config.tsx",
        "./HeaderCurriculum": "./src/Layouts/header-curriculum.tsx",
        "./FooterCopyright": "./src/Layouts/copyright-footer.tsx"
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_ENV': JSON.stringify(process.env.REACT_ENV),
    }),
  ],
});
