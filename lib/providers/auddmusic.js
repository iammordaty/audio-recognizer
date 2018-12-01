'use strict';

const AudDMusicLib = require('auddapilib');

const Provider = require('./provider.js');

/**
 * AudDMusic provider
 *
 * @extends Provider
 */
class AudDMusic extends Provider {

    /**
     * @constructor
     * @param {Object} config
     */
    constructor (config) {
        super(config);

        AudDMusicLib.Configuration.apiToken = config.api_token;

        this.controller = AudDMusicLib.APIController;
    }

    /**
     * @api public
     * @param {String} file
     * @returns {Promise}
     */
    recognize (file) {
        const url = undefined;
        const audio = undefined;
        const mreturn = 'media_array';
        const itunesCountry = 'us';

        return this.controller.recognize(url, file, audio, mreturn, itunesCountry);
    }

    /**
     * @api public
     * @param {Object} response
     * @returns {Boolean}
     */
    isResponseSuccessful ({ status }) {
        return status === 'success';
    }

    /**
     * @api public
     * @param {Object} response
     * @returns {Object}
     */
    normalizeResult ({ status, result }) {
        const normalized = {
            provider: this.name,
            status,
            results: []
        };

        if (!result) {
            return normalized;
        }

        const { artist, title, album, release_date, label } = result;
        const track = {
            artist,
            title,
            album,
            release_date,
            label,
            score: null
        };

        normalized.results.push(track);

        return normalized;
    }
}

module.exports = AudDMusic;
