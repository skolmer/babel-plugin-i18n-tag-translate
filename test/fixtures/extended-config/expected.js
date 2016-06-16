import i18n, { i18nConfig } from "es2015-i18n-tag";
i18nConfig({ "translations": { "key": "value" }, "date": { "hour12": true }
});
i18nConfig({ "group": "fixtures/extended-config/actual.js" });
i18n`Sie haben ${ amount }:c auf Ihrem Bankkonto, ${ name }.`;
