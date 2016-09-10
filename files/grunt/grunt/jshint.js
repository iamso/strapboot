module.exports = {

  options: {
    jshintrc: 'grunt/configs/.jshintrc',
    reporter: require('jshint-stylish'),
    ignores: ['assets/js/vendor/**/*.js', 'assets/js/_src/vendor/**/*.js']
  },
  all: ['assets/js/_src/**/*.js']

};
