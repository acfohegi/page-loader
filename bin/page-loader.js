#!/usr/bin/env node

import { Command } from 'commander';
import PageLoader from '../src/PageLoader.js';

const program = new Command();

program
  .name('page-loader')
  .description('Page loader utility')
  .version('1.0.0');

program
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .argument('<url>')
  .action((url, options) => {
    const pageLoader = new PageLoader(url, options);
    pageLoader.load()
      .then((htmlPath) => {
        console.log('\nPage was succesfully downloaded into', htmlPath);
      })
      .catch((e) => {
        console.error(e.message);
        process.exitCode = 1;
      });
  });

program.parse();
