const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractMinCSS = new ExtractTextPlugin('../css/[name].min.css');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: {
		'job-scraper' : [
			'./css/job-scraper-display.css',
			'./css/job-scraper-modal.css'
		]
	},
	'output': {
		filename: '[name].js',
		path: path.join(__dirname, '/dist/')
	},
	'module' : {
		rules: [
			{
				test: /\.(css)/,
		      use: ExtractMinCSS.extract({
			    fallback: 'style-loader',
			    use: [
			      {
			        loader: 'css-loader',
			        options: {
			          minimize: true,
			          optimize: true,
			          comments: false
			        }
			      },
			      {
			      	loader: 'postcss-loader',
			      },
			    ]
			  })
		  },
		]
	},
  	plugins: [
	    ExtractMinCSS,
	    new OptimizeCSSAssets()
	]
}