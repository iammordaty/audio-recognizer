'use strict';

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

module.exports = printResults;
