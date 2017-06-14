(function(module) {
  'use strict';

  const _         = require('lodash');
  const path      = require('path');
  const fs        = require('fs');
  const vfs       = require('vinyl-fs');
  const map       = require('map-stream');
  const isText    = require('istextorbinary').isTextSync;
  const colors    = require('colors');
  const through   = require('through2');
  const globule   = require('globule');

  const user      = process.env.USER;
  const gitUser   = require('git-config').sync().user;

  const base      = __dirname;

  _.templateSettings = {
    evaluate:    /\{%(.+?)%\}/g,
    interpolate: /\{%=(.+?)%\}/g,
    escape: /\{%-(.+?)%\}/g
  };

  module.exports = (answers, dir) => {

    let files = {
      general: vfs.src([
        `${base}/files/general/{.,}**/{.,}*`,
        `!${base}/files/**/.DS_Store`
      ]),
      gulp: vfs.src([
        `${base}/files/gulp/{.,}**/{.,}*`,
        `!${base}/files/gulp/package.json`,
        `!${base}/files/**/.DS_Store`
      ]),
      grunt: vfs.src([
        `${base}/files/grunt/{.,}**/{.,}*`,
        `!${base}/files/grunt/package.json`,
        `!${base}/files/**/.DS_Store`
      ]),
      css: vfs.src([
        `${base}/files/css/{.,}**/{.,}*`,
        `!${base}/files/**/.DS_Store`
      ]),
      scss: vfs.src([
        `${base}/files/scss/{.,}**/{.,}*`,
        `!${base}/files/**/.DS_Store`
      ]),
      webpack: vfs.src([
        `${base}/files/js/webpack/{.,}**/{.,}*`,
        `!${base}/files/**/.DS_Store`
      ]),
      concat: vfs.src([
        `${base}/files/js/concat/{.,}**/{.,}*`,
        `!${base}/files/**/.DS_Store`
      ]),
    };

    return new Promise((resolveAll) => {
      answers.year = (new Date()).getFullYear();
      answers.taskrunner = answers.taskrunner || 'gulp';
      answers.styles = answers.styles || 'css';
      answers.scripts = answers.scripts || 'webpack';
      answers.packagemanager = answers.packagemanager || 'yarn';
      answers.dependencies = fs.readFileSync(`${base}/files/${answers.taskrunner}/package.json`, 'utf-8');

      // console.log(answers);

      writeGeneral()
        .then(writeTaskrunner)
        .then(writeStyles)
        .then(writeScripts)
        .then(writeInstructions);;

      function writeGeneral() {
        return new Promise((resolve) => {
          console.log(colors.bold(`\nWriting general files:`));
          files.general
            .pipe(sort())
            .pipe(map(process))
            .pipe(vfs.dest(dir))
            .on('end', () => {
              resolve();
            });
        });
      }
      function writeTaskrunner() {
        return new Promise((resolve) => {
          console.log(colors.bold(`\nWriting ${answers.taskrunner} files:`));
          files[answers.taskrunner]
            .pipe(sort())
            .pipe(map(process))
            .pipe(vfs.dest(dir))
            .on('end', () => {
              resolve();
            });
        });
      }
      function writeStyles() {
        return new Promise((resolve) => {
          console.log(colors.bold(`\nWriting ${answers.styles} files:`));
          files[answers.styles]
            .pipe(sort())
            .pipe(map(process))
            .pipe(vfs.dest(`${dir}/assets/css/_src`))
            .on('end', () => {
              resolve();
            });
        });
      }
      function writeScripts() {
        return new Promise((resolve) => {
          console.log(colors.bold(`\nWriting javascript files:`));
          files[answers.scripts]
            .pipe(sort())
            .pipe(map(process))
            .pipe(vfs.dest(`${dir}/assets/js/_src`))
            .on('end', () => {
              resolve();
            });
        });
      }
      function writeInstructions(cb) {
        console.log(`
${colors.bold('Instructions:')}
You should now install project dependencies with ${colors.underline('npm install')}.
After that, you may execute project tasks with ${colors.underline(answers.taskrunner)}.

${colors.green('Done.')}`);

        resolveAll();
      }


      function sort() {
        let files = [];

        return through.obj(function (file, enc, cb) {
            files.push(file);
            cb();
        }, function (cb) {
            files.sort((a, b) => {
              return a.path.localeCompare(b.path);
            });
            files.forEach((file) => {
                this.push(file);
            });
            cb();
        });
      }

      function process(file, cb) {
        let filepath;
        if (file.isBuffer()) {
          if (isText('', file.contents)) {
            let content = file.contents.toString();
            content = _.template(content, null, _.templateSettings)(answers);
            file.contents = new Buffer(content);
          }
        }
        filepath = file.path;
        filepath = filepath.replace(new RegExp(`${base}/files/general/`), '');
        filepath = filepath.replace(new RegExp(`${base}/files/gulp/`), '');
        filepath = filepath.replace(new RegExp(`${base}/files/grunt/`), '');
        filepath = filepath.replace(new RegExp(`${base}/files/css/`), 'assets/css/_src/');
        filepath = filepath.replace(new RegExp(`${base}/files/scss/`), 'assets/css/_src/');
        console.log(`Writing ${filepath}...${colors.green('OK')}`);
        cb(null, file);
      }
    });
  };

})(module);

