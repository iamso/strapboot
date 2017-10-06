let webpack = require('webpack');
let path = require('path');

module.exports = {
  name: 'js',

  output: {
    publicPath: '/',
  },

  externals: {
    'jquery': 'jQuery',
  },

  resolve: {
    alias: {
    },
    modules: ['bower_components', 'node_modules'],
    descriptionFiles: ['bower.json', 'package.json'],
    mainFields: ['browser', 'main'],
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      // $: 'jquery',
      // jQuery: 'jquery',
      // 'window.jQuery': 'jquery'
    }),
  ],

  module: {
    loaders: [
      {
        loader: 'babel-loader',

        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,

        exclude: [
          /bower_components/,
          /node_modules/,
        ],

        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: [
            ['env', {
              loose: true,
              modules: false
            }]
          ],
        }
      }
    ]
  }

};
