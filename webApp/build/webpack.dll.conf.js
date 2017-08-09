const path = require('path')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		vendor: [
			'axios',
			'vue-router'
		]
	},
	output: {
		path: path.resolve(__dirname, '../static/js'),
		filename: '[name].dll.js',
		library: '[name]_library'
	},
	module: {
		loaders: [{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules\/(?!(autotrack|dom-utils))/
			}
		]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
		new webpack.DllPlugin({
			path: path.join(__dirname, '.', '[name]-manifest.json'),
			libraryTarget: 'commonjs2',
			name: '[name]_library'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
}
