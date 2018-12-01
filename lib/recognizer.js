'use strict';

const { getDefaultProviders } = require('./providers');
const Cache = require('file-system-cache').default;

/**
 * AudioRecognizer
 */
class AudioRecognizer {

    /**
     * @param {Object} config
     */
    constructor (config) {
        this.config = config;

        const { cache_success_responses, cache_dir, providers } = config;

        this.cache = cache_success_responses ? new Cache({ basePath: cache_dir }) : null;
        this.providers = providers || getDefaultProviders(config);
    }

    /**
     * @api public
     * @param {String} pathname
     * @returns {Promise}
     */
    recognize (pathname) {
        const { normalize_results } = this.config;

        const results = Object.values(this.providers).map(async provider => {
            let result = await this.getProviderResult(provider, pathname);

            if (normalize_results) {
                result = provider.normalizeResult(result);
            }

            return result;
        });

        return Promise.all(results);
    }

    /**
     * @api private
     * @param {Object} provider
     * @param {String} pathname
     * @returns {Object}
     */
    async getProviderResult (provider, pathname) {
        const { cache_success_responses } = this.config;

        if (!cache_success_responses) {
            const result = await provider.recognize(pathname);

            return result;
        }

        const cacheKey = `${pathname}${provider.name}`;
        const result = this.cache.getSync(cacheKey) || await provider.recognize(pathname);

        if (provider.isResponseSuccessful(result)) {
            this.cache.set(cacheKey, result);
        }

        return result;
    }
}

module.exports = AudioRecognizer;
