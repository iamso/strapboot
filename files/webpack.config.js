const webpack = require('webpack');
const path = require('path');
const Visualizer = require('webpack-visualizer-plugin2');
const pkg = require('./package.json');

let include = [
  /assets/,
];

module.exports = {
  name: 'js',

  output: {
    publicPath: '/',
  },

  externals: {},

  resolve: {
    alias: {
      '@': path.join(__dirname, 'assets/js/_src'),
    },
    modules: ['node_modules'],
    descriptionFiles: ['package.json'],
    mainFields: ['browser', 'module', 'main'],
  },

  optimization: {
    usedExports: true
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
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
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
            ],
            presets: [
              ['@babel/env', {
                useBuiltIns: 'usage',
                corejs: 3
              }]
            ],
          }
        }
      }
    ]
  }
};
