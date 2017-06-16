var path = require('path');

module.exports = {
	entry: path.resolve(__dirname,'src')+'/app/index.js',
	output: {
		path: path.resolve(__dirname,'dist')+'/app',
		filename: 'bundle.js',
		publicPath: '/app/'
	},
	module: {
		loaders: [
			{
				test:/\.js$/,
				include: path.resolve(__dirname,'src'),
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015','react']
				}
			},
			{
				test: /\.css/,
				loader: 'style-loader!css-loader'
			}
		]
	}
}