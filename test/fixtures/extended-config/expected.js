const __translationGroup = "fixtures/extended-config/actual.js";import i18n, { i18nConfig, i18nGroup } from "es2015-i18n-tag";
i18nConfig({ "translations": { "key": "value" }, "date": { "hour12": true }
});
i18n`Sie haben ${amount}:c auf Ihrem Bankkonto, ${name}.`;
