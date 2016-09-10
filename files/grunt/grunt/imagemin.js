module.exports = {

  dist: {
    files: [{
      expand: true,
      cwd: 'assets/img/',
      src: ["**/*.{png,jpg,gif,svg}"],
      dest: 'assets/img/'
    }]
  }


};
