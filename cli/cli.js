'use strict';

const { basename } = require('path');
const { readFileSync } = require('fs');

const { name, version } = require('../package.json');

const DEFAULT_CLI_CONFIG_PATH = './cli/config.json';

/**
 * @param {String} pathname
 * @return {undefined}
 */
const loadConfig = pathname => {
    const contents = readFileSync(pathname);

    return JSON.parse(contents);
};

/**
 * @return {undefined}
 */
const printHelp = () => {
    console.log(`CLI for ${name} ${version}.\n`);
    console.log(`Usage: ${basename(__filename)} [-c config-path] <fragment-path>\n`);
    console.log('Where:');
    console.log(`  -c <config-path>     Path to the config file (defaults to "${DEFAULT_CLI_CONFIG_PATH}").`);
    console.log('  <fragment-path>      Path to the fragment of the track to be recognized (required).');
    console.log('                       Suggested fragment duration is 15 - 20 seconds.');
    console.log('');
};

/**
 * @param {Array} results
 * @return {undefined}
 */
const printResults = results => {
    results.forEach(({ provider, status, results: tracks }) => {
        console.log(`${provider} recognition status: ${status}.`);

        if (!tracks.length) {
            return console.log(' - No tracks found\n');
        }

        tracks.forEach(track => printTrack(track));

        console.log('');
    });
};

/**
 * @param {Object} track
 * @return {undefined}
 */
const printTrack = ({ artist, title, album, release_date, label, score }) => {
    process.stdout.write(` - ${artist} – ${title}`);

    if (album) {
        process.stdout.write(` (${album})`);
    }

    if (release_date || label) {
        const released = [ release_date, label ? `by ${label}` : '' ].filter(i => i).join(' ');

        process.stdout.write(` (released ${released})`);
    }

    if (score) {
        process.stdout.write(` (score: ${score}%)`);
    }

    process.stdout.write('\n');
};

module.exports = {
    DEFAULT_CLI_CONFIG_PATH,
    loadConfig,
    printHelp,
    printResults
};
