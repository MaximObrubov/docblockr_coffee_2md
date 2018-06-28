#!/usr/bin/env node
'use strict';

const program = require('commander'),
      exec = require('child_process').exec,
      parser = require('parse_jsdocblockr');

let getTable = (file, options) => {




  let execCallback = (error, stdout, stderr) => {
    if (error) console.log("exec error: " + error);
    if (stdout) console.log("Result: \n" + stdout + "\n\n" + table);
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
