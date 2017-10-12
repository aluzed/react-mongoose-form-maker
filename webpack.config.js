var webpack = require('webpack');
var path = require('path');

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR  = path.resolve(__dirname, 'src');

var config = {
  entry: SRC_DIR + '/index.js',
  output: {
    path: DIST_DIR,
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module : {
    rules : [
      {
        test : /\.js?/,
        include : SRC_DIR,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env']
          }
        }
      }
    ]
  },
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  }
};

module.exports = config;
