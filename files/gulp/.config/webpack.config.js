let webpack = require('webpack');
let BowerWebpackPlugin = require('bower-webpack-plugin');
let path = require('path');

module.exports = {
  name: 'js',

  output: {
    publicPath: '/',
  },

  externals: {
    "jquery": "jQuery",
    // "ujs": "ujs",
  },

  resolve: {
    alias: {
      ujs: `${__dirname}/bower_components/u.js/dist/u.min.js`,
    },
  },

  plugins: [
    new BowerWebpackPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
  ],

  module: {
    loaders: [
      {
        loader: 'babel-loader',

        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,

        exclude: [
          /node_modules/,
        ],

        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0'],
        }
      }
    ]
  }

};
