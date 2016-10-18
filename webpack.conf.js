const path = require('path');
// const webpack = require('webpack');

module.exports = {
	// devtool: '#source-map',
	debug: false,
	output: {
		filename: 'app.js',
		// sourceMapFilename: 'app.js.map',
		publicPath: './assets/'
	},
	resolve: {
		modulesDirectories: ['src', 'node_modules'],
		root: path.join(__dirname, '/src'),
		extensions: ['', '.js', '.json']
	},
	module: {
		loaders: [
			{ test: /\.html$/, loader: 'mustache' },
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/,
				query: {
					presets: ['es2015']
					// plugins: ['transform-runtime', 'transform-object-rest-spread' ]
				}
			}
		]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin(),
		// new webpack.optimize.DedupePlugin()
	]

};
