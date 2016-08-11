var path = require("path");
var webpack = require("webpack");

var paths = require('../paths');
var config = require('../configuration');

module.exports = {
  devtool: "source-map",
  debug: true,
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client',
    './src/scripts/index.jsx'
  ],
  output: {
    path: path.join(__dirname) + '../' + paths.js,
    publicPath: paths.assetsURI + 'scripts/',
    filename: 'combined.js'
  },
  resolve: {
    root: path.resolve('src'),
    modulesDirectories: ['node_modules', 'components'],
    extensions: ['', '.js', '.jsx', '.css'],
    alias: {
      'TweenLite': 'gsap/src/uncompressed/TweenLite'
    }
  },
  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]_[hash:base64:5]&minimize!postcss-loader']
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?optimizationLevel=7&interlaced=false'
      ]
    }
    ]
  },
  postcss: config.postCssPlugins,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ]
};
