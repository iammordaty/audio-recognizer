'use strict';

const ACRCloudLib = require('acrcloud');
const fs = require('fs');

const Provider = require('./provider.js');

const ACR_CLOUD_RESULT_OK = 0;
const ACR_CLOUD_NO_RESULT = 1001;

/**
 * ACRCloud provider
 *
 * @extends Provider
 */
class ACRCloud extends Provider {

    /**
     * @param {Object} config
     */
    constructor (config) {
        super(config);

        this.acrcloud = new ACRCloudLib(config);
    }

    /**
     * @api public
     * @param {Buffer} pathname
     * @returns {Promise}
     */
    recognize (pathname) {
        const sample = fs.readFileSync(pathname);

        return this.acrcloud.identify(sample);
    }

    /**
     * @api public
     * @param {Object} response
     * @returns {Boolean}
     */
    isResponseSuccessful ({ status }) {
        return [ ACR_CLOUD_RESULT_OK, ACR_CLOUD_NO_RESULT ].includes(status.code);
    }

    /**
     * @api public
     * @param {Object} response
     * @returns {Object}
     */
    normalizeResult ({ status, metadata }) {
        let message = status.msg.toLowerCase();

        if (status.code === ACR_CLOUD_NO_RESULT) {
            message = 'success';
        }

        const music = (metadata || {}).music || [];

        const results = music.map(track => {
            const { artists, title, release_date, label, album, score } = track;
            const artist = artists.map(artist => artist.name).join(', ');

            return {
                artist,
                title,
                album: album.name,
                release_date,
                label: label || '',
                score
            };
        });

        const normalized = {
            provider: this.name,
            status: message,
            results
        };

        return normalized;
    }
}

module.exports = ACRCloud;
