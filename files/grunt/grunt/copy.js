module.exports = {
  vendor: {
    files: [
      {
        expand: true,
        src: [
          'bower_components/jquery/dist/jquery*',
          'bower_components/promise-polyfill/promise.*',
        ],
        dest: 'assets/js/vendor',
        filter: 'isFile',
        flatten: true,
      },
    ]
  }
};
