module.exports = {
  "default": [
    "dist",
    "watch"
  ],
  "css": [
    "sass",
    "autoprefixer",
    "cssmin",
    "usebanner:css",
    "notify:css"
  ],
  "js": [
    "jshint",
    "concat",
    // "babel",
    "uglify",
    "usebanner:js",
    "notify:js"
  ],
  "dev": [
    "sass",
    "autoprefixer",
    "jshint",
    "copy",
    "concat",
    // "babel",
    "uglify",
    "cssmin",
    "modernizr",
    "usebanner",
  ],
  "dist": [
    "sass",
    "autoprefixer",
    "jshint",
    "copy",
    "concat",
    // "babel",
    "uglify",
    "cssmin",
    "modernizr",
    "imagemin",
    "svgmin",
    // "htmlmin",
    "usebanner",
    "manifest",
    "notify:all"
  ]
};
