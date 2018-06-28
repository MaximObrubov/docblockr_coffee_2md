#!/usr/bin/env node
'use strict';

const program = require('commander'),
      MarkdownTableProvider = require('../mdp.js');

let getTable = (file, options) => {

  console.log(file, options);


  const tableProvider = new MarkdownTableProvider(file);


  // let execCallback = (error, stdout, stderr) => {
  //   if (error) console.log("exec error: " + error);
  //   if (stdout) console.log("Result: \n" + stdout + "\n\n" + tableProvider);
  //   if (stderr) console.log("shell error: " + stderr);
  // };
  // exec(fullCommand, execCallback);
}


// program.command('jsd2md <file>');
program
  .version('0.0.1')
  .description('Create markdown table from jsdoc')
  .arguments('<cmd> [env]')
  .option('-o, --option','option description')
  .option('-o,--output', 'output file')
  .option('-a,--all', 'run all files in current directory')
  .action(getTable);

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args && program.args.length === 0) program.help();
