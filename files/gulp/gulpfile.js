const gulp            = require('gulp');
const gutil           = require("gulp-util");
const autoprefixer    = require('gulp-autoprefixer');
const postcss         = require('gulp-postcss');
const postcssImport   = require('postcss-import');
const postcssMixins   = require('postcss-mixins');
const postcssCssnext  = require('postcss-cssnext');
const postcssComments = require('postcss-discard-comments');
const postcssScss     = require('postcss-scss');
const sourcemaps      = require('gulp-sourcemaps');
const rename          = require('gulp-rename');
const cssnano         = require('gulp-cssnano');
const uglify          = require('gulp-uglify');
const jshint          = require('gulp-jshint');
const banner          = require('gulp-banner');
const manifest        = require('gulp-manifest');
const modernizr       = require('gulp-modernizr');
const imagemin        = require('gulp-imagemin');
const htmlmin         = require('gulp-htmlmin');
const sass            = require('gulp-sass');
const concat          = require('gulp-concat');
const notify          = require('gulp-notify');

const pkg             = require('./package.json');

const browserSync     = require('browser-sync').create();
const reload          = browserSync.reload;

const styles         = '{%= styles %}'; // css | scss
const scripts        = '{%= scripts %}'; // webpack | concat

const comment       = `/*!
 * ${pkg.name}
 *
 * Made with ❤ by ${pkg.author}
 *
 * Copyright (c) ${(new Date()).getFullYear()} ${pkg.copyright}
 */
`;

const src           = {
  cssAll:   'assets/css/_src/**/*.css',
  cssMain:  'assets/css/_src/main.css',
  cssDest:  'assets/css',
  scssAll:  'assets/css/_src/**/*.scss',
  scssMain: 'assets/css/_src/main.scss',
  scssDest: 'assets/css',
  jsAll:    'assets/js/_src/**/*.js',
  jsMain:   'assets/js/_src/main.js',
  jsDest:   'assets/js',
};

const uglifyConfig  = {
  mangle: {
    except: ['jQuery, u']
  },
  compress: {
    drop_console: true
  },
  preserveComments: false,
};

const autoprefixerConfig = {
  browsers: ['last 4 version', 'Android 4', 'iOS 7'],
  diff: true,
  map: false,
  remove: false,
};

const jshintConfig  = require('./.config/jshint.config');
const webpackConfig = require('./.config/webpack.config');
const webpack       = require('webpack-stream');

gulp.task('watch', () => {
  browserSync.init({
    proxy: '{%= local %}',
    port: 3000,
    open: true,
    notify: false,
  });

  gulp.watch(src[`${styles}All`], [styles]);
  gulp.watch(src.jsAll, [scripts]);
});

gulp.task('css', () => {
  return gulp.src(src.cssMain)
    // .pipe(sourcemaps.init())
    .pipe(postcss([
      postcssImport,
      postcssMixins,
      postcssCssnext(autoprefixerConfig),
      postcssComments({removeAll: true}),
    ]), {syntax: postcssScss})
    // .pipe(sourcemaps.write())
    .pipe(rename('bundle.css'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.cssDest))
    .pipe(cssnano({
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(rename('bundle.min.css'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.cssDest))
    .pipe(reload({stream: true}))
    .pipe(notify('css done'));
});

gulp.task('scss', () => {
  return gulp.src(src.scssMain)
    // .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerConfig))
    // .pipe(sourcemaps.write())
    .pipe(rename('bundle.css'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.scssDest))
    .pipe(cssnano({
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(rename('bundle.min.css'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.scssDest))
    .pipe(reload({stream: true}))
    .pipe(notify('scss done'));
});

gulp.task('webpack', ['jshint'], () => {
  return gulp.src(src.jsMain)
    .pipe(webpack(webpackConfig))
    .pipe(rename('bundle.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(uglify(uglifyConfig))
    .pipe(rename('bundle.min.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(reload({stream: true}))
    .pipe(notify('js done'));
});

gulp.task('concat', ['jshint'], () => {
  return gulp.src([
      'assets/js/_src/components/cssevents.js',
      'bower_components/u.js/dist/u.js',
      'bower_components/fastclick/lib/fastclick.js',
      'assets/js/_src/main.js',
      'assets/js/_src/components/social.js',
      'assets/js/_src/components/log.js',
    ])
    .pipe(concat('bundle.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(uglify(uglifyConfig))
    .pipe(rename('bundle.min.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(reload({stream: true}))
    .pipe(notify('js done'));
});

gulp.task('jshint', () => {
  return gulp.src(src.jsAll)
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('fallback', () =>  {
  return gulp.src('assets/js/_src/fallback.js')
    .pipe(uglify(uglifyConfig))
    .pipe(banner(comment))
    .pipe(rename('fallback.min.js'))
    .pipe(gulp.dest(src.jsDest));
});

gulp.task('vendor', () => {
  return gulp.src([
    'bower_components/jquery/dist/jquery*',
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
    .pipe(uglify(uglifyConfig))
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

gulp.task('default', ['dist', 'watch']);

gulp.task('dev', [styles, scripts, 'fallback', 'modernizr', 'watch']);

gulp.task('dist', [styles, scripts, 'fallback', 'vendor', 'modernizr', 'manifest', 'imagemin'], () => {
  return gulp.src('./')
    .pipe(notify('dist done'));
});
