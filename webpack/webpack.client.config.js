var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/client/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../build/public/js'),
    filename: 'bundle.js',
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions:         ['', '.js', '.jsx']
  },    
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      PRODUCTION: JSON.stringify(true),
    }),
  ],
  module: {
    noParse: [
      /aws/
    ],
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
