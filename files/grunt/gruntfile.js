module.exports = function(grunt) {

  // measures the time each task takes
  require('time-grunt')(grunt);

  // load grunt config
  require('load-grunt-config')(grunt, {
    config: {
      banner: '/*!\n' +
      ' * <%= package.name %>\n' +
      ' * \n' +
      ' * Made with ❤ by <%= package.author %>\n' +
      ' * \n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= package.copyright %>\n' +
      ' */'
    }
  });
};
