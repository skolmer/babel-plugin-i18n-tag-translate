# i18n Tagged Template Literals - Babel Plugin [![Build Status](https://img.shields.io/travis/skolmer/babel-plugin-i18n-tag-translate/master.svg?style=flat)](https://travis-ci.org/skolmer/babel-plugin-i18n-tag-translate) [![npm version](https://img.shields.io/npm/v/babel-plugin-i18n-tag-translate.svg?style=flat)](https://www.npmjs.com/package/babel-plugin-i18n-tag-translate)
[![NPM](https://nodei.co/npm/babel-plugin-i18n-tag-translate.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/babel-plugin-i18n-tag-translate/)

[![i18n Tagged Template Literals](images/vscode-18n-tag-schema-icon-big.jpg)](http://i18n-tag.kolmer.net/)

## Overview
This [babel](https://babeljs.io/) plugin can be used to bake translations into your release build, to add predefined i18n configuration or to add i18n Tag global variables to your output. 

The i18n babel plugin can also be used to generate [File Module Groups](https://github.com/skolmer/es2015-i18n-tag#babel-generated-file-module-groups) to group your translations by the file-path of the related JavaScript module. This can be very useful to keep track of the translations within your source code.

## Features
* Build time translation of [i18n tagged template literals](https://github.com/skolmer/es2015-i18n-tag) based on a [json configuration](https://github.com/skolmer/i18n-tag-schema)
* Add i18n global variables at build time
* Inject module filenames into your source to group translations by module

## Installation

```sh
$ npm install babel-plugin-i18n-tag-translate --save-dev
```

## Example

**In**

```js
i18n`Hello ${ name }, you have ${ amount }:c in your bank account.`;
```

**translation.json**
```json
{
    "Hello ${0}, you have ${1} in your bank account.": "Sie haben ${1} auf Ihrem Bankkonto, ${0}."
}
```

**Out**

```js
i18n`Sie haben ${ amount }:c auf Ihrem Bankkonto, ${ name }.`;
```


## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
{
  "plugins": [
    ["i18n-tag-translate", {
      "translation": "./translations/translation.de.json",
      "globalImport": true, // Adds import i18n, { i18nConfig, i18nGroup } from "es2015-i18n-tag"; to your modules
      "groupDir": "./src", // Adds file group name to each module. e.g. const __translationGroup = "components/index.js";
      "config": { // Adds i18nConfig({"locale": "en-US", "translations": { "key": "value" }, "number": { ... }, "date": { ... }}); to the output
        "locales": "en-US",
        "translations": { "key": "value" },
        "number": { 
          ...options
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat#Parameters
        },
        "date": { 
          ...options
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters
        }
      }  
    }]
  ]
}
```

> **Note:** You need to include [es2015-i18n-tag](https://github.com/skolmer/es2015-i18n-tag) in your exported script for i18n runtime support. 
You can do this in the entry point of your javascript application or set `globalImport` flag to `true`.


### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: [
    ["i18n-tag-translate", {
      "translation": "./translations/translation.de.json"      
    }]
  ]
});
```

### Via Gulp

```javascript
const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')

gulp.task('build-release-de', () => {
  // build a german release
  browserify('./src/index.js').transform('babelify', {
    'presets': [
      'es2015',
      'stage-0'
    ],
    'plugins': [
      ['i18n-tag-translate', {
        'translation': './translations/translation.de.json'
      }]
    ]
  }).bundle()
    .on('error', function (err) { console.error(err); this.emit('end'); })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
})

```

## Tools

### Run time translation and localization
* [es2015-i18n-tag](https://github.com/skolmer/es2015-i18n-tag): ES2015 template literal tag for i18n and l10n (translation and internationalization) using Intl [![npm version](https://img.shields.io/npm/v/es2015-i18n-tag.svg?style=flat)](https://www.npmjs.com/package/es2015-i18n-tag)

### Schema based translations
* [i18n-tag-schema](https://github.com/skolmer/i18n-tag-schema): JSON Schema based translation validation and tools [![npm version](https://img.shields.io/npm/v/i18n-tag-schema.svg?style=flat)](https://www.npmjs.com/package/i18n-tag-schema)
* [vscode-18n-tag-schema](https://github.com/skolmer/vscode-i18n-tag-schema): Visual Studio Code Extension for JSON Schema based translation validation and tools [![Marketplace Version](https://vsmarketplacebadge.apphb.com/version-short/skolmer.vscode-i18n-tag-schema.svg)](https://marketplace.visualstudio.com/items?itemName=skolmer.vscode-i18n-tag-schema)

## License

Copyright (c) 2016 Steffen Kolmer

This software is licensed under the MIT license.  See the `LICENSE` file
accompanying this software for terms of use.
