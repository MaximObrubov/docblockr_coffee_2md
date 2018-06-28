#!/usr/bin/env node
'use strict';

import MarkdownTableProvider from 'mdp';

const program = require('commander'),
      exec = require('child_process').exec;

let getTable = (file, options) => {
  const tableProvider = new MarkdownTableProvider(file);

  let execCallback = (error, stdout, stderr) => {
    if (error) console.log("exec error: " + error);
    if (stdout) console.log("Result: \n" + stdout + "\n\n" + tableProvider);
    if (stderr) console.log("shell error: " + stderr);
  };
  exec(fullCommand, execCallback);
}

program
  .version('0.0.1')
  .command('jsd2md [file]')
  .description('Create markdown table from jsdoc')
  .option('-o, --output', 'output file')
  .option('-a, --all', 'run all files in current directory')
  .action(getTable);
program.parse(process.argv);
