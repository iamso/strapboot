#! /usr/bin/env node

(function() {
  'use strict';

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

  const dir       = cwd;

  const strapboot = require('../index');

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
        return `Most awesomest project ever!`;
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
  ];

  if (globule.find(`${dir}/{.,}*`, `!${dir}/**/.DS_Store`).length) {
    console.log(colors.red.bold('\nDirectory is not empty!'));
    return;
  }

  console.log('\nAnswer the questions below to setup the project.\n');

  inquirer.prompt(questions).then((answers) => {
    strapboot(answers, dir).then(() => {
      // console.log('strapboot is done');
    });

  });

})();
