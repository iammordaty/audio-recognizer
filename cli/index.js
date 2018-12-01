#!/usr/bin/env node

'use strict';

const fs = require('fs');
const minimist = require('minimist');
const path = require('path');

const { name, version } = require('../package.json');
const printResults = require('./output.js');
const Recognizer = require('../lib/recognizer');

const DEFAULT_CLI_CONFIG_PATH = './cli/config.json';

const argv = minimist(process.argv.slice(2));
const fragmentPathname = argv._.shift();

if (!fragmentPathname || argv.help || argv.h) {
    console.log(`CLI for ${name} ${version}.\n`);
    console.log(`Usage: ${path.basename(__filename)} [-c config-path] <fragment-path>\n`);
    console.log('Where:');
    console.log(`  -c <config-path>     Path to the config file (defaults to "${DEFAULT_CLI_CONFIG_PATH}").`);
    console.log('  <fragment-path>      Path to the fragment of the track to be recognized (required).');
    console.log('                       Suggested fragment duration is 15 - 20 seconds.');
    console.log('');

    process.exit(1);
}

const configPathname = argv.c || DEFAULT_CLI_CONFIG_PATH;

[ fragmentPathname, configPathname ].forEach(pathname => {
    if (!fs.existsSync(pathname) || !fs.lstatSync(pathname).isFile()) {
        console.log(`"${path.basename(pathname)}" does not exist or is not a regular file.`);

        process.exit(2);
    }
});

const config = JSON.parse(fs.readFileSync(configPathname));
const recognizer = new Recognizer(config);

recognizer.recognize(fragmentPathname)
    .then(results => printResults(results))
    .catch(err => console.error('An error occurred', err));
