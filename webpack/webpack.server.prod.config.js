var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: path.resolve(__dirname, '../src/server/server.jsx'),
  target: 'node',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'server.js'
  },
  externals: nodeModules,
  plugins: [
    new webpack.DefinePlugin({
      // A common mistake is not stringifying the "production" string.
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
};
