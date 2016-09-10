module.exports = {
  options: {
    plugins: [
      { removeViewBox: false },               // don't remove the viewbox atribute from the SVG
      { removeUselessStrokeAndFill: false },  // don't remove Useless Strokes and Fills
      { removeEmptyAttrs: false }             // don't remove Empty Attributes from the SVG
    ]
  },
  dist: {
    files: [
        {
            expand: true,
            cwd: "assets/img/",
            src: ['**/*.svg'],
            dest: 'assets/img/',
            ext: '.svg'
        }
    ]
  }
};
