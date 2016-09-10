module.exports = {
  js: {
    files: [
      'assets/js/_src/**/*.js'
    ],
    tasks: ['js'],
    options: {
      //livereload: true
    }
  },
  css: {
    files: [
      'assets/css/_src/**/*.scss',
    ],
    tasks: ['css']
  },
  grunt: {
    files: [
      'grunt/**/*.*'
    ],
    tasks: ['dist']
  }

};
