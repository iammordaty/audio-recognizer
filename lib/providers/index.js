'use strict';

const ACRCloud = require('./acrcloud.js');
const AudDMusic = require('./auddmusic.js');

/**
 * @param {Object} config
 * @return {Object}
 */
const getDefaultProviders = ({ acrcloud, auddmusic }) => ({
    acrcloud: new ACRCloud(acrcloud),
    auddmusic: new AudDMusic(auddmusic),
});

module.exports = {
    ACRCloud,
    AudDMusic,
    getDefaultProviders
};
