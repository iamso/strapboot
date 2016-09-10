module.exports = {
  options: {
    position: 'top',
    banner: '<%= banner %>',
    linebreak: true
  },
  css: {
    files: {
      src: [ 'assets/css/bundle.css', 'assets/css/bundle.min.css' ]
    }
  },
  js: {
    files: {
      src: [ 'assets/js/bundle.js', 'assets/js/bundle.min.js' ]
    }
  }
};
