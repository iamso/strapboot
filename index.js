((module) => {
  const _         = require('lodash');
  const path      = require('path');
  const fs        = require('fs');
  const vfs       = require('vinyl-fs');
  const map       = require('map-stream');
  const isText    = require('istextorbinary').isText;
  const colors    = require('colors');
  const through   = require('through2');
  const globule   = require('globule');
  const npm       = require('npm-commands');
  const git       = require('simple-git')();

  const user      = process.env.USER;
  const gitUser   = require('git-config').sync().user;

  const base      = __dirname;

  _.templateSettings = {
    evaluate:    /\{%(.+?)%\}/g,
    interpolate: /\{%=(.+?)%\}/g,
    escape: /\{%-(.+?)%\}/g
  };

  module.exports = async (answers, dir) => {

    let files = vfs.src([
      `${base}/files/{.,}**/{.,}*`,
      `!${base}/files/**/.DS_Store`
    ]);

    answers = {
      year: (new Date()).getFullYear(),
      taskrunner: 'gulp',
      styles: 'css',
      scripts: 'webpack',
      packagemanager: 'npm',
      ...answers,
    };

    await writeFiles();
    await installDependencies();
    await createRepo();
    await writeInstructions();

    async function writeFiles() {
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

    async function createRepo() {
      console.log(colors.bold('\n\nCreating repository:'));
      console.log('Init repository');
      await git.init();
      console.log(`Add remote origin ${colors.underline(answers.repository)}`);
      await git.addRemote('origin', answers.repository);
      console.log('Stage files');
      await git.add(['.']);
      console.log('Create initial commit "strapboot setup"');
      await git.commit('strapboot setup');
    }

    async function installDependencies() {
        const options = require(`${dir}/package.json`);
        console.log(colors.bold('\n\nInstalling dependencies:'));
        npm().cwd(dir).output(true).install();
    }

    async function writeInstructions() {
      console.log(colors.bold('\n\nInstructions:'));
      console.log(`You can now start development with ${colors.underline(`${answers.packagemanager} start`)}.`);
      console.log(`And build with ${colors.underline(`${answers.packagemanager} run dist`)}.`);
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
  };

})(module);
