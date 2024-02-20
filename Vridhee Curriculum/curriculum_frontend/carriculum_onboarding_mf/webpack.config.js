const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const fs = require('fs');

require('dotenv').config()

const config = fs.readFileSync("./configuration.json");
let configjson = JSON.parse(config);

let config_details = process.env.NODE_ENV.toString() == "local" ? configjson.local : configjson.server
console.log(config_details, "config_details")


const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({


  mode: 'development',

  output: {
    // publicPath: "http://localhost:5030/",
    publicPath: config_details.onboardingMFUrl
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 5030,
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
      name: "curriculum_onboarding_mf",
      filename: "remoteEntry.js",
      remotes: {
        vridhee_common_component_mf: `vridhee_common_component_mf@${config_details.commonMFUrl}remoteEntry.js`,
        curriculum_onboarding_mf: `curriculum_onboarding_mf@${config_details.onboardingMFUrl}remoteEntry.js`,

      },
      exposes: {
        "./OnboardingService": "./src/Services/onboardingService.tsx",
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
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
