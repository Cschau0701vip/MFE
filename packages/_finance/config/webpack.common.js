const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    polyfills: "./src/polyfills.ts", // add this
    main: "./src/index.js" //change this
  },
  output: {
    filename: '[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: 'file-loader' }]
      },
      {
        test: /\.ts$/,
        use: [{loader: 'ts-loader'}]
      },
      {
        test: /\.html$/,
        use: [{loader: 'html-loader'}]
      },
      {
        test: /\.ts$/,
        use: [{loader:'angular2-template-loader'}],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.scss|\.css$/,
        use: [
            // {
            //     loader: "raw-loader",
            //     options: {
            //         esModule: false,
            //     }
            // },
            {
                loader: "sass-loader",
                options: {
                    sourceMap: true,
                },
            },
        ],      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',            
      // inject: "body",
      // scriptLoading: "blocking"
    })
  ]
};
