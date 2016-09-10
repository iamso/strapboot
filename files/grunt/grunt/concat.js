module.exports = {
  options: {
    separator: ';\n',
    stripBanners: {
      block: false,
      line: false
    }
  },
  dist: {
    src: [
      'assets/js/_src/components/cssevents.js',
      'bower_components/u.js/dist/u.js',
      'bower_components/fastclick/lib/fastclick.js',
      'assets/js/_src/main.js',
      'assets/js/_src/components/social.js',
      'assets/js/_src/components/log.js',
    ],
    dest: 'assets/js/bundle.js',
  }
};
