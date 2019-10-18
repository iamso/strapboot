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
      '@': path.join(__dirname, 'assets/js/_src'),
    },
    modules: ['bower_components', 'node_modules'],
    descriptionFiles: ['bower.json', 'package.json'],
    mainFields: ['browser', 'module', 'main'],
  },

  optimization: {
    usedExports: true
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.ProvidePlugin({}),
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
              ['@babel/env', {
                modules: false,
                // useBuiltIns: 'usage',
              }]
            ],
          }
        }
      }
    ]
  }
};
