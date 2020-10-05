const webpack = require('webpack');
const path = require('path');
const Visualizer = require('webpack-visualizer-plugin');
const pkg = require('./package.json');

let include = [
  /assets/,
];
// if (pkg.dependencies) {
//   for (let dependency of Object.keys(pkg.dependencies)) {
//     include.push(new RegExp(`node_modules/${dependency.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}/.*`, 'gi'));
//   }
// }

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
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
            ],
            presets: [
              ['@babel/env', {
                // modules: false,
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
