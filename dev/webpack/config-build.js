var _ = require('underscore');
var defaultConf = require ('./config');

var path = require("path");
var webpack = require("webpack");
var paths = require('../paths');

module.exports = _.extend(_.omit(defaultConf, 'debug', 'entry', 'devtool', 'output', 'plugins'), {
	output: {
		publicPath: paths.assetsURI + 'scripts/',
		filename: 'combined.min.js'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			__ENV__: JSON.stringify('production'),
			'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production') }
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom'
		})
    ]
});
