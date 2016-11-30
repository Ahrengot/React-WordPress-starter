var path = require("path");
var webpack = require("webpack");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var paths = require('./paths');

module.exports = {
  context: __dirname + "/src",
  devtool: "source-map",
  entry: {
    // main: './css/main.css',
    combined: './scripts/index.js'
  },
  output: {
    path: path.join(__dirname) + '/' + paths.js,
    publicPath: paths.assetsURI,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["react", "es2015"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        /*use: {
          loader: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?optimizationLevel=7&interlaced=false'
          ]
        }*/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: ['node_modules', 'components']
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: paths.http,
      open: false
    }, {
      reload: false // let Webpack Dev Server handle reloads
    })
  ]
};
