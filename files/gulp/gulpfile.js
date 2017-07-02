const gulp            = require('gulp');
const gutil           = require("gulp-util");
const babel           = require('gulp-babel');
{% if (scripts === 'webpack') { %}
const webpack         = require('webpack-stream');
{% } else { %}
const concat          = require('gulp-concat');
{% } %}{% if (styles === 'css') { %}
const postcss         = require('gulp-postcss');
const postcssImport   = require('postcss-import');
const postcssMixins   = require('postcss-mixins');
const postcssCssnext  = require('postcss-cssnext');
const postcssComments = require('postcss-discard-comments');
const postcssNested   = require('postcss-nested');
const postcssEach     = require('postcss-each');
const postcssFor      = require('postcss-for');
const postcssCond     = require('postcss-conditionals');
const postcssSimple   = require('postcss-simple-vars');
const postcssReporter = require('postcss-reporter');
{% } else { %}
const sass            = require('gulp-sass');
const autoprefixer    = require('gulp-autoprefixer');
{% } %}
const sourcemaps      = require('gulp-sourcemaps');
const cssnano         = require('gulp-cssnano');
const rename          = require('gulp-rename');
const uglify          = require('gulp-uglify');
const eslint          = require('gulp-eslint');
const banner          = require('gulp-banner');
const manifest        = require('gulp-manifest');
const modernizr       = require('gulp-modernizr');
const imagemin        = require('gulp-imagemin');
const htmlmin         = require('gulp-htmlmin');
const notify          = require('gulp-notify');
const iconfont        = require('gulp-iconfont');
const consolidate     = require('gulp-consolidate');

const pkg             = require('./package.json');

const browserSync     = require('browser-sync').create();
const reload          = browserSync.reload;

const comment         = `/*!
 * ${pkg.name}
 *
 * Made with ❤ by ${pkg.author}
 *
 * Copyright (c) ${(new Date()).getFullYear()} ${pkg.copyright}
 */
`;

const src             = {
  cssAll:       'assets/css/_src/**/*.{%= styles %}',
  cssMain:      'assets/css/_src/main.{%= styles %}',
  cssDest:      'assets/css',
  jsAll:        'assets/js/_src/**/*.js',
  jsMain:       'assets/js/_src/main.js',
  jsDest:       'assets/js',
  iconsAll:     'assets/icons/*.svg',
  iconsCss:     'assets/icons/_template/_icons.css',
  iconsCssDest: 'assets/css/_src/partials/modules/',
  iconsDest:    'assets/fonts',
};

const uglifyConfig    = {
  mangle: {
    reserved: ['jQuery']
  },
  compress: {
    drop_console: true
  },
  output: {
    comments: false,
  }
};

const prefixConfig    = {
  diff: true,
  map: false,
  remove: false,
};

const eslintConfig    = require('./.config/eslint.config');
{% if (scripts === 'webpack') { %}const webpackConfig   = require('./.config/webpack.config');{% } %}

gulp.task('watch', () => {
  browserSync.init({
    proxy: '{%= local %}',
    port: 3000,
    open: true,
    notify: false,
  });

  gulp.watch(src.cssAll, ['css']);
  gulp.watch(src.jsAll, ['js']);
  gulp.watch(src.iconsAll, ['iconfont']);
});
{% if (styles === 'css') { %}
gulp.task('css', () => {
  return gulp.src(src.cssMain)
    // .pipe(sourcemaps.init())
    .pipe(postcss([
      postcssImport,
      postcssMixins,
      postcssFor,
      postcssEach,
      postcssSimple,
      postcssCond,
      postcssCssnext(prefixConfig),
      postcssNested,
      postcssComments({removeAll: true}),
      postcssReporter({ clearMessages: true }),
    ]))
    // .pipe(sourcemaps.write())
    .pipe(rename('bundle.css'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.cssDest))
    .pipe(cssnano({
      discardComments: {
        removeAll: true
      },
      zindex:  false,
    }))
    .pipe(rename('bundle.min.css'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.cssDest))
    .pipe(reload({stream: true}))
    .pipe(notify('css done'));
});
{% } else { %}
gulp.task('css', () => {
  return gulp.src(src.cssMain)
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(prefixConfig))
    // .pipe(sourcemaps.write())
    .pipe(rename('bundle.css'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.cssDest))
    .pipe(cssnano({
      discardComments: {
        removeAll: true
      },
      zindex:  false,
    }))
    .pipe(rename('bundle.min.css'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.cssDest))
    .pipe(reload({stream: true}))
    .pipe(notify('css done'));
});
{% } %}{% if (scripts === 'webpack') { %}
gulp.task('js', ['eslint'], () => {
  return gulp.src(src.jsMain)
    .pipe(webpack(webpackConfig))
    .pipe(rename('bundle.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(uglify(uglifyConfig).on('error', onError))
    .pipe(rename('bundle.min.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(reload({stream: true}))
    .pipe(notify('js done'));
});
{% } else { %}
gulp.task('js', ['eslint'], () => {
  return gulp.src([
      'assets/js/_src/components/cssevents.js',
      'bower_components/ujs/dist/u.js',
      'bower_components/fastclick/lib/fastclick.js',
      'bower_components/httprom/dist/http.js',
      'assets/js/_src/main.js',
      'assets/js/_src/components/social.js',
      'assets/js/_src/components/log.js',
    ])
    .pipe(babel({
      presets: ['es2015', 'stage-0'],
    }))
    .pipe(concat('bundle.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(uglify(uglifyConfig).on('error', onError))
    .pipe(rename('bundle.min.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(reload({stream: true}))
    .pipe(notify('js done'));
});
{% } %}
gulp.task('eslint', () => {
  return gulp.src(src.jsAll)
    .pipe(eslint(eslintConfig))
    .pipe(eslint.format());
});

gulp.task('fallback', () =>  {
  return gulp.src('assets/js/_src/fallback.js')
    .pipe(babel({
      presets: ['es2015', 'stage-0'],
    }))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(uglify(uglifyConfig).on('error', onError))
    .pipe(rename('fallback.min.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest));
});

gulp.task('vendor', () => {
  return gulp.src([
      'bower_components/jquery/dist/jquery*',
      'bower_components/promise-polyfill/promise.*',
    ])
    .pipe(gulp.dest('assets/js/vendor'));
});

gulp.task('modernizr', () => {
  return gulp.src([`${src.cssDest}/*.css`, `${src.jsDest}/*.js`])
    .pipe(modernizr({
      "cache": false,
      "extra" : {
        "shiv" : true,
        "printshiv" : true,
        "load" : true,
        "mq" : true,
        "cssclasses" : true
      },
      "options" : [
        "setClasses",
        "addTest",
        "html5printshiv",
        "testProp",
        "fnBind",
        "mq"
      ],
      "excludeTests": [
        "hidden"
      ],
      "parseFiles" : true,
      "crawl" : true,
      "uglify" : true,
      "matchCommunityTests" : true,
    }))
    .pipe(uglify(uglifyConfig).on('error', onError))
    .pipe(gulp.dest(`${src.jsDest}/vendor`));
});

gulp.task('manifest', () => {
  return gulp.src(['./**/*.*'])
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['*'],
      filename: 'manifest.appcache',
      exclude: [
        '*.appcache',
        '**/*.json',
        '**/_src/**/*.*',
        'webpack.config.js',
        'gulpfile.js',
        'bower_components/**/*.*',
        'node_modules/**/*.*',
      ]
     }))
    .pipe(gulp.dest('./'));
});

gulp.task('imagemin', () => {
  return gulp.src('assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/img'));
});

gulp.task('htmlmin', ['public'], () => {
  return gulp.src('*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./public'));
});

gulp.task('public', () => {
  return gulp.src([
      '**/.htaccess',
      '*.png',
      '*.ico',
      '*.txt',
      '*.appcache',
      'assets/**/*.*',
      '!assets/**/_src/*',
    ])
    .pipe(gulp.dest('./public'));
});

gulp.task('iconfont', () => {
  gulp.src(src.iconsAll)
    .pipe(iconfont({
      fontName: 'icons',
      prependUnicode: false,
      formats: ['woff2', 'woff', 'svg'],
      normalize: true,
      centerHorizontally: true,
      fontHeight: 1000 // IMPORTANT
    }))
    .on('glyphs', (glyphs, options) => {
      glyphs = glyphs.map((glyph) => {
        glyph.codepoint = glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase();
        return glyph;
      });
      gulp.src(src.iconsCss)
        .pipe(consolidate('lodash', Object.assign({}, options, {
          glyphs: glyphs,
          cssPrefix: 'icon-',
          fontPath: '../fonts/',
        })))
        .pipe(rename('_icons.{%= styles %}'))
        .pipe(gulp.dest(src.iconsCssDest));
    })
    .pipe(gulp.dest(src.iconsDest));
});

gulp.task('default', ['dist', 'watch']);

gulp.task('dev', ['iconfont', 'css', 'js', 'fallback', 'modernizr', 'watch']);

gulp.task('dist', ['iconfont', 'css', 'js', 'fallback', 'vendor', 'modernizr', 'manifest', 'imagemin'], () => {
  return gulp.src('./')
    .pipe(notify('dist done'));
});

// generic error handler
function onError(err) {
  // console.log(err.toString());
  this.emit('end');
}
