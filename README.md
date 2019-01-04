# audio-recognizer

Node.js module for audio recognition services.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Further information](#further-information)
- [See also](#see-also)
- [License](#license)

## Getting Started

In order to use the module, you need to acquire credentials for your application, which can be obtained from the provider's websites.

## Installation

This library can be installed through npm:

```
$ npm install --save audio-recognizer
```

## Usage

The following example shows how to initialize the library and recognize track based on its fragment.
Suggested fragment duration is 15 - 20 seconds.

```js
const AudioRecognizer = require('audio-recognizer');

const config = {
    cache_success_responses: true,
    cache_dir: './cache',
    normalize_results: true,
    acrcloud: {
        host: '',
        access_key: '',
        access_secret: '',
        endpoint: '/v1/identify',
        signature_version: '1',
        data_type: 'audio'
    },
    auddmusic: {
        api_token: ''
    }
}

const recognizer = new AudioRecognizer(config);

recognizer.recognize('path-to-track-fragment.mp3')
    .then(results => /* process results */)
    .catch(e => /* handle error */);
```

Also, module can be used via commandline interface:

```
$ node cli -c cli/config.json fragment.mp3
ACRCloud recognition status: success.
 - The Rogue Element – Backbreaker (Rogue Rock) (released 2005-09-26 by Exceptional Records) (score: 76%)
 - Robert Vagner – Blaze (Hi, Everyone...) (released 2015-04-13 by Robert Vagner) (score: 76%)
 - Deky – Pincher's Dog (Welcome to My Mind) (released 2014-02-25) (score: 73%)

AudDMusic recognition status: success.
 - Robert Vagner – Blaze (Hi, Everyone...) (released 2015-04-13 by Robert Vagner)
```

Type `node cli -h` for more information.

## Further information

 - [ACRCloud HTTP API Reference](https://www.acrcloud.com/docs/acrcloud/audio-fingerprinting-api)
 - [AudDMusic HTTP API Reference](https://docs.audd.io)

## See also

 - [soundcloud-track-recognizer](https://github.com/iammordaty/soundcloud-track-recognizer)
 - [soundcloud-track-recognizer-cli](https://github.com/iammordaty/soundcloud-track-recognizer-cli)

## License

audio-recognizer is licensed under the MIT License.
