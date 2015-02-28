var path = require('path');

module.exports = {
	devtool: '#source-map',
	debug: false,
	output: {
		filename: 'app.js',
		sourceMapFilename: 'app.map.js',
		publicPath: './public/assets/'
	},
	resolve: {
		modulesDirectories: ['modules', 'node_modules'],
		root: path.join(__dirname, '/src/modules'),
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
