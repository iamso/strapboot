#! /usr/bin/env node

const _         = require('lodash');
const inquirer  = require("inquirer");
const sh        = require("shelljs");
const cwd       = sh.pwd().toString();
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
const dir       = cwd;

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
};

let questions = [
  {
    type: 'input',
    name: 'name',
    message: 'project name:',
    default: path.basename(cwd),
    validate: (input) => {
      return /^([a-z0-9\-\_\.]+)$/.test(input);
    },
  },
  {
    type: 'input',
    name: 'homepage',
    message: 'homepage:',
    default: (answers) => {
      return `${answers.name}.com`;
    },
  },
  {
    type: 'input',
    name: 'local',
    message: 'local url:',
    default: (answers) => {
      return `${answers.homepage}.local`;
    },
  },
  {
    type: 'input',
    name: 'description',
    message: 'description:',
    default: (answers) => {
      return `${answers.name} description`;
    },
  },
  {
    type: 'input',
    name: 'version',
    message: 'version:',
    default: '0.1.0'
  },
  {
    type: 'input',
    name: 'author',
    message: 'author:',
    default: (answers) => {
      return `${gitUser.name} <${gitUser.email}>`;
    },
  },
  {
    type: 'input',
    name: 'copyright',
    message: 'copyright:',
    default: (answers) => {
      return answers.author.replace(/\s*<.*>/, '');
    },
  },
  {
    type: 'input',
    name: 'repository',
    message: 'repository:',
    default: (answers) => {
      return `git://github.com/${gitUser.name}/${answers.name}.git`;
    },
  },
  {
    type: "list",
    name: "taskrunner",
    message: "taskrunner:",
    choices: [
      "gulp",
      "grunt"
    ]
  },
  {
    when: (response) => {
      return response.taskrunner === 'gulp';
    },
    type: 'list',
    name: 'styles',
    message: "styles:",
    choices: [
      "css",
      "scss"
    ]
  },
  {
    when: (response) => {
      return response.taskrunner === 'gulp';
    },
    type: 'list',
    name: 'scripts',
    message: "scripts:",
    choices: [
      "webpack",
      "concat"
    ]
  },

];

_.templateSettings.interpolate = /\{%=([\s\S]+?)%\}/g;

if (globule.find(`${dir}/{.,}*`, `!${dir}/**/.DS_Store`).length) {
  console.log(colors.red.bold('\nDirectory is not empty!'));
  return;
}

console.log('\nAnswer the questions below to setup the project.\n');

inquirer.prompt(questions).then((answers) => {
  answers.year = (new Date()).getFullYear();
  answers.dependencies = fs.readFileSync(`${base}/files/${answers.taskrunner}/package.json`, 'utf-8');

  // console.log(answers);

  writeGeneral()
    .then(writeTaskrunner)
    .then(writeStyles)
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
      if (answers.taskrunner === 'gulp') {
        console.log(colors.bold(`\nWriting ${answers.styles} files:`));
        files[answers.styles]
          .pipe(sort())
          .pipe(map(process))
          .pipe(vfs.dest(`${dir}/assets/css/_src`))
          .on('end', () => {
            resolve();
          });
      }
      else {
        resolve();
      }
    });
  }
  function writeInstructions() {
    console.log(`
${colors.bold('Instructions:')}
You should now install project dependencies with ${colors.underline('npm install')}.
After that, you may execute project tasks with ${colors.underline(answers.taskrunner)}.

${colors.green('Done.')}`);
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
        content = content.replace(/<%=/g, encodeURIComponent('<%='));
        content = _.template(content, null, _.templateSettings)(answers);
        content = content.replace(new RegExp(encodeURIComponent('<%='), 'g'), '<%=');
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
