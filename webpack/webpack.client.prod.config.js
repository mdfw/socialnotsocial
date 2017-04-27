var webpack = require('webpack');
var path = require('path');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/client/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../build/public/js'),
    filename: 'bundle.js',
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions:         ['.js', '.jsx']
  },    
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      PRODUCTION: JSON.stringify(true),
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  }
};
