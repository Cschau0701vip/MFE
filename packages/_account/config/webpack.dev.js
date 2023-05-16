const { merge } = require('webpack-merge'); // this is used to be able to merge webpack.common.js with this file
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8085/'
  },
  devServer: {
    port: 8085,
    historyApiFallback: {
      index: '/index.html'
    },
    headers: {
      'Access-Control-AllowOrigin': '*'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'account',
      filename: 'remoteEntry.js',
      exposes: {
        './AccountApp': './src/index'
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, devConfig); // devConfig will override anything that we have set in commonConfig if they set the same thing
