var path = require('path');

module.exports = {
	devtool: '#source-map',
	debug: false,
	output: {
		filename: 'app.js',
		sourceMapFilename: 'app.js.map',
		publicPath: './assets/'
	},
	resolve: {
		// modulesDirectories: ['src', 'node_modules'],
		root: path.join(__dirname, '/src'),
		extensions: ['', '.js', '.json']
	},
	module: {
		loaders: [
			{ test: /\.html$/, loader: 'mustache' },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader?experimental&comments=false'
			}
		]
	}
};
