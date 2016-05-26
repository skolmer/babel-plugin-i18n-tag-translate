# babel-plugin-i18n-tag-translate
[![](images/vscode-18n-tag-schema-icon-big.jpg)](https://github.com/skolmer/es2015-i18n-tag)

Translates i18n tagged template literals based on a json configuration.

This script can be used to bake translations into your release build.

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

## Installation

```sh
$ npm install babel-plugin-i18n-tag-translate --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": [
    ["i18n-tag-translate", {
      "translation": "./translation.de.json"  
    }]
  ]
}
```

#### Note
You need to include [es2015-i18n-tag](https://github.com/skolmer/es2015-i18n-tag) in your exported script for i18n runtime support. 
You can do this in the entry point of your javascript application or set `globalImport` flag to `true`.


### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: [
    ["i18n-tag-translate", {
      "translation": "./translation.de.json",
      "globalImport": true, // Adds import i18n, { i18nConfig } from "es2015-i18n-tag"; to the output
      "config": { // Adds i18nConfig({"locale": "en-US", "currency": "USD", "number": { ... }, "date": { ... }}); to the output
        "locales": "en-US",
        "translations": { "key": "value" }
        "number": { 
          [...options]
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat#Parameters
        },
        "date": { 
          [...options]
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters
        }
      }
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
const path = require('path')

gulp.task('build-release-de', () => {
  // build a german release
  const translations = path.resolve(__dirname, './translations/translation.de.json');

  browserify('./src/index.js').transform('babelify', {
    'presets': [
      'es2015',
      'stage-0'
    ],
    'plugins': [
      ['i18n-tag-translate', {
        'translation': translations
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

## JSON Schema

Generate a JSON schema based on all i18n tagged template literals in your project

* [i18n-tag-schema](https://github.com/skolmer/i18n-tag-schema)
* [Visual Studio Code Extension](https://github.com/skolmer/vscode-i18n-tag-schema)
