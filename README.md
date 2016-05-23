# babel-plugin-i18n-tag-translate

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
$ npm install babel-plugin-i18n-tag-translate
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
