#!/usr/bin/env node

'use strict';

const { basename } = require('path');
const { existsSync, lstatSync } = require('fs');
const minimist = require('minimist');

const { DEFAULT_CLI_CONFIG_PATH, loadConfig, printHelp, printResults } = require('./cli.js');
const Recognizer = require('../lib/recognizer');

const argv = minimist(process.argv.slice(2));

if (!argv._.length || argv.help || argv.h) {
    printHelp();

    process.exit(1);
}

const config = argv.c || DEFAULT_CLI_CONFIG_PATH;
const fragment = argv._.shift();

const missing = [ fragment, config ].find(pathname => !(existsSync(pathname) && lstatSync(pathname).isFile()));

if (missing) {
    console.error(`"${basename(missing)}" does not exist or is not a regular file.`);

    process.exit(2);
}

const loadedConfig = loadConfig(config);
const recognizer = new Recognizer(loadedConfig);

recognizer.recognize(fragment)
    .then(results => printResults(results))
    .catch(err => console.error('An error occurred', err));
