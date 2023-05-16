const path = require('path');
const { merge } = require('webpack-merge'); // this is used to be able to merge webpack.common.js with this file
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'), // output directory
    publicPath: 'http://localhost:8084/'
  },
  devtool: "source-map",
  devServer: {
    port: 8084,
    historyApiFallback: {
      index: '/index.html'
    },
    headers: {
      'Access-Control-AllowOrigin': '*'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'finance',
      filename: 'remoteEntry.js',
      exposes: {
        './FinanceApp': './src/main.ts'
      },
      shared: ["@angular/core", "@angular/common", "@angular/router"]//shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, devConfig); // devConfig will override anything that we have set in commonConfig if they set the same thing
