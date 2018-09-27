const gulp            = require('gulp');
const gutil           = require("gulp-util");
const path            = require('path');

const babel           = require('gulp-babel');
const webpack         = require('webpack-stream');

const postcss         = require('gulp-postcss');
const postcssApply    = require('postcss-apply');
const postcssImport   = require('postcss-import');
const postcssMixins   = require('postcss-mixins');
const postcssPresetEnv = require('postcss-preset-env');
const postcssCalc     = require('postcss-calc');
const postcssComments = require('postcss-discard-comments');
const postcssNested   = require('postcss-nested');
const postcssEach     = require('postcss-each');
const postcssGradient = require('postcss-easing-gradients');
const postcssFor      = require('postcss-for');
const postcssCond     = require('postcss-conditionals');
const postcssSimple   = require('postcss-simple-vars');
const postcssProps    = require('postcss-custom-properties');
const postcssReporter = require('postcss-reporter');

const sourcemaps      = require('gulp-sourcemaps');
const cssnano         = require('gulp-cssnano');
const rename          = require('gulp-rename');
const eslint          = require('gulp-eslint');
const banner          = require('gulp-banner');
const modernizr       = require('gulp-modernizr');
const imagemin        = require('gulp-imagemin');
const htmlmin         = require('gulp-htmlmin');
const notify          = require('gulp-notify');
const iconfont        = require('gulp-iconfont');
const consolidate     = require('gulp-consolidate');
const replace         = require('gulp-replace');

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
  cssAll:       'assets/css/_src/**/*.css',
  cssMain:      'assets/css/_src/main.css',
  cssDest:      'assets/css',
  jsAll:        'assets/js/_src/**/*.js',
  jsMain:       'assets/js/_src/main.js',
  jsDest:       'assets/js',
  iconsAll:     'assets/icons/*.svg',
  iconsCss:     'assets/icons/_template/_icons.css',
  iconsCssDest: 'assets/css/_src/partials/modules/',
  iconsDest:    'assets/fonts',
};

const babelMinify = [
  'minify',
  {
    mangle: {
      exclude: ['jQuery', '$']
    },
    deadcode: true,
    removeConsole: true,
    removeDebugger: true,
    removeUndefined: true,
    builtIns: false,
  }
];

const prefixConfig    = {
  diff: true,
  map: false,
  remove: false,
};

const webpackConfig   = require('./webpack.config');
let webpackMode = 'none';

gulp.task('watch', (done) => {
  browserSync.init(['**/*.html', '**/*.php'], {
    proxy: '{%= local %}',
    port: 3000,
    open: true,
    notify: false,
  });

  gulp.watch(src.cssAll, gulp.series('css'));
  gulp.watch(src.jsAll, gulp.series('js'));
  gulp.watch(src.iconsAll, gulp.series('iconfont'));
  done();
});

gulp.task('css', (done) => {
  return gulp.src(src.cssMain)
    // .pipe(sourcemaps.init())
    .pipe(postcss([
      postcssImport,
      postcssMixins,
      postcssProps,
      postcssFor,
      postcssEach,
      postcssSimple,
      postcssCond,
      postcssGradient,
      postcssApply,
      postcssPresetEnv({
        autoprefixer: prefixConfig,
        stage: 0,
        features: {
          'nesting-rules': true
        },
      }),
      postcssNested,
      postcssCalc,
      postcssComments({removeAll: true}),
      postcssReporter({ clearMessages: true }),
    ]))
    .on('error', done)
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

gulp.task('eslint', () => {
  return gulp.src(src.jsAll)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('fallback', () =>  {
  return gulp.src('assets/js/_src/fallback.js')
    .pipe(babel({
      presets: ['@babel/preset-env', {comments: false}],
    }))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(babel({
      presets: [babelMinify, {comments: false}]
    }))
    .pipe(rename('fallback.min.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest));
});

gulp.task('js', gulp.series('eslint', 'fallback', () => {
  webpackConfig.mode = webpackMode;
  return gulp.src(src.jsMain)
    .pipe(webpack(webpackConfig)).on('error', onError)
    .pipe(rename('bundle.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(replace(/window\.app\s\=.*/, ''))
    .pipe(babel({
      presets: [babelMinify, {comments: false}]
    }))
    .pipe(rename('bundle.min.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(reload({stream: true}))
    .pipe(notify('js done'));
}));

gulp.task('vendor', () => {
  return gulp.src([
      'node_modules/jquery/dist/jquery*',
      'node_modules/promise-polyfill/dist/promise.*',
      'node_modules/objectFitPolyfill/dist/*',
      'node_modules/intersection-observer/intersection-observer.js',
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
    .pipe(babel({
      presets: [babelMinify]
    }))
    .pipe(gulp.dest(`${src.jsDest}/vendor`));
});

gulp.task('imagemin', () => {
  return gulp.src('assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/img'));
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

gulp.task('htmlmin', gulp.series('public', () => {
  return gulp.src('*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./public'));
}));

gulp.task('iconfont', () => {
  return gulp.src(src.iconsAll)
    .pipe(iconfont({
      fontName: 'icons',
      prependUnicode: false,
      formats: ['woff2', 'woff', 'svg'],
      normalize: true,
      centerHorizontally: true,
      fontHeight: 1000 // IMPORTANT
    }))
    .on('glyphs', (glyphs, options) => {
      options.glyphs = glyphs.map((glyph) => {
        glyph.codepoint = glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase();
        return glyph;
      });

      gulp.src(src.iconsCss)
        .pipe(consolidate('lodash', Object.assign({}, options, {
          timestamp: Math.round(+new Date()/1000),
          param: true,
          cssPrefix: 'icon-',
          fontPath: '../fonts/',
        })))
        .pipe(rename('_icons.css'))
        .pipe(gulp.dest(src.iconsCssDest));
    })
    .pipe(gulp.dest(src.iconsDest));
});

gulp.task('webpack-dev', (done) => {
  webpackMode = 'none';
  done();
});

gulp.task('webpack-prod', (done) => {
  webpackMode = 'production';
  done();
});

gulp.task('dev', gulp.series('webpack-dev', 'iconfont', 'css', 'js', 'fallback', 'vendor', 'watch'));

gulp.task('dist', gulp.series('webpack-prod', 'iconfont', 'css', 'js', 'fallback', 'vendor', 'imagemin'), () => {
  return gulp.src('./')
    .pipe(notify('dist done'));
});

gulp.task('default', gulp.series('dev', 'webpack-dev', 'watch'));

// generic error handler
function onError(err) {
  gutil.log(err.message);
  this.emit('end');
}
