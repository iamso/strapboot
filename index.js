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

    let files = vfs.src([
      `${base}/files/{.,}**/{.,}*`,
      `!${base}/files/**/.DS_Store`
    ]);

    return new Promise((resolveAll) => {
      answers.year = (new Date()).getFullYear();
      answers.taskrunner = answers.taskrunner || 'gulp';
      answers.styles = answers.styles || 'css';
      answers.scripts = answers.scripts || 'webpack';
      answers.packagemanager = answers.packagemanager || 'npm';

      // console.log(answers);

      writeFiles()
        .then(writeInstructions);;

      function writeFiles() {
        return new Promise((resolve) => {
          console.log(colors.bold(`\nWriting files:`));
          files
            .pipe(sort())
            .pipe(map(process))
            .pipe(vfs.dest(dir))
            .on('end', () => {
              resolve();
            });
        });
      }

      function writeInstructions(cb) {
        console.log(`
${colors.bold('Instructions:')}
You should now install project dependencies with ${colors.underline(`${answers.packagemanager} install`)}.
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
            file.contents = Buffer.from(content);
          }
        }
        filepath = file.path;
        filepath = filepath.replace(new RegExp(`${base}/files/`), '');
        console.log(`Writing ${filepath}...${colors.green('OK')}`);
        cb(null, file);
      }
    });
  };

})(module);
