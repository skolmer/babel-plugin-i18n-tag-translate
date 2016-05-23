# babel-plugin-i18n-tag-translate
![](images/vscode-18n-tag-schema-icon-big.jpg)

Translates i18n tagged template literals based on a json configuration

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

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: [
    ["i18n-tag-translate", {
      "translation": "./translation.de.json",
      "globalImport": true, // Adds import i18n, { i18nConfig } from "i18n"; to the output
      "config": { // Adds i18nConfig({"locale": "en-US", "defaultCurrency": "USD", "number": { ... }, "date": { ... }}); to the output
        "locale": "en-US",
        "currency": "USD",
        "number": { 
          // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
          "localeMatcher",
          "style",
          "currency",
          "currencyDisplay",
          "useGrouping",
          "minimumIntegerDigits",
          "minimumFractionDigits",
          "maximumFractionDigits",
          "minimumSignificantDigits",
          "maximumSignificantDigits"
        },
        "date": { 
          // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
          "localeMatcher",
          "timeZone",
          "hour12",
          "formatMatcher",
          "weekday",
          "era",
          "year",
          "month",
          "day",
          "hour",
          "minute",
          "second",
          "timeZoneName"
        }
      }
    }]
  ]
});
```

## JSON Schema

Generate a JSON schema based on all i18n tagged template literals in you project

* [Visual Studio Code Extension](https://github.com/skolmer/vscode-i18n-tag-schema)