module.exports = {
  options: {
    aggressiveMerging: false,
    shorthandCompacting: false,
    processImport: false,
    rebase: false,
    keepSpecialComments: 0
  },
  target: {
    files: {
      'assets/css/bundle.min.css': ['assets/css/bundle.css']
    }
  }
};
