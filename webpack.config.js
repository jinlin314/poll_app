var path = require('path');
var webpack = require('webpack');

var config = {
  entry: path.resolve(__dirname, 'views/main.jsx'),
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loaders: ['babel-loader?presets[]=react,presets[]=es2015'],
    }]
  }
};

module.exports = config;