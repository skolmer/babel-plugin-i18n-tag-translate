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
      "translation": "./translation.de.json"  
    }]
  ]
});
```

## JSON Schema

Generate a JSON schema based on all i18n tagged template literals in you project

* [i18n-tag-schema](https://github.com/skolmer/i18n-tag-schema)
* [Visual Studio Code Extension](https://github.com/skolmer/vscode-i18n-tag-schema)
