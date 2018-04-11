const webpack = require('webpack');
const path = require('path');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin()
]

if(process.env.NODE_ENV === 'production')
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    mangle: true,
    sourcemap: false,
    beautify: false,
    dead_code: true
  }));

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // React
      {
        test: path.join(__dirname, 'src'),
        loader: ['babel-loader'],
        query: {
          cacheDirectory: 'babel_cache',
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins
};
