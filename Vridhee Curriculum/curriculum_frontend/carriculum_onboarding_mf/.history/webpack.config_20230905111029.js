const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:5030/",
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
        vridhee_common_component_mf:"vridhee_common_component_mf@http://localhost:5010/remoteEntry.js",
      },
      exposes: {
        "./OnboardingService":"./src/Services/onboardingService.tsx", 
        "./IUser":"./src/Models/IUser.tsx",
        "./Lang":"./src/Pages/lang.tsx",
        "./Personalinformation": "./src/Pages/personal-information.tsx",
        "./Awards":"",
        "./Education":"",
        "./Hobbiespassion":"",
        "./Learinginterest":"",
        "./Network":"",
        "./Professional":"",
        "./Skills":"",
        "./Teaching":"",
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
  ],
});
