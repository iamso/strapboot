module.exports = {
  options: {
    mangle: {
      except: ['jQuery, u']
    },
    compress: {
      drop_console: true
    },
    preserveComments: false,
    sourceMap: true
  },
  dist: {
    files: {
      'assets/js/bundle.min.js': ['assets/js/bundle.js']
    }
  },
  fallback: {
    files: {
      'assets/js/fallback.min.js': ['assets/js/_src/fallback.js']
    }
  }
};
