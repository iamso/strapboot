module.exports = {
  options: {
    // sourceMap: true,
    presets: ['babel-preset-es2015']
  },
  dist: {
    // files: {
    //   'assets/js/main.js': 'assets/js/main.js'
    // }
    files: [{
      expand: true,
      cwd: 'assets/js',
      src: '*.js',
      dest: 'assets/js',
    }]
  }
};
