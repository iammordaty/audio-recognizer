'use strict';

/**
 * Provider base class
 */
class Provider {

    /**
     * @api public
     * @returns {Promise}
     */
    recognize () {
        throw new Error('Method "recognize" is not implemented');
    }

    /**
     * @api public
     * @returns {Object}
     */
    isResponseSuccessful () {
        throw new Error('Method "isResponseSuccessful" is not implemented');
    }

    /**
     * @api public
     * @returns {Object}
     */
    normalizeResult () {
        throw new Error('Method "normalizeResult" is not implemented');
    }

    /**
     * @api publc
     * @returns {String}
     */
    get name () {
        return this.constructor.name;
    }
}

module.exports = Provider;
