const webpack = require('webpack');
const path = require('path');
const Visualizer = require('webpack-visualizer-plugin');
const pkg = require('./package.json');

let include = [
  /assets/,
  /bower_components/,
];
if (pkg.dependencies) {
  for (let dependency of Object.keys(pkg.dependencies)) {
    include.push(new RegExp(`node_modules/${dependency.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}/.*`, 'gi'));
  }
}

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
    new Visualizer(),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-runtime'],
            presets: [
              ['@babel/preset-env', {
                modules: false,
                useBuiltIns: 'usage',
              }]
            ],
          }
        }
      }
    ]
  }
};
