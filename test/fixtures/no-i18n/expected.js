"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es2015I18nTag = require("es2015-i18n-tag");

var _es2015I18nTag2 = _interopRequireDefault(_es2015I18nTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __translationGroup = "fixtures/no-i18n/actual.js";(0, _es2015I18nTag.i18nConfig)({ "translations": { "key": "value" }, "date": { "hour12": true } });

// anonymous class
var _default = function () {
    function _default() {
        _classCallCheck(this, _default);
    }

    _createClass(_default, [{
        key: "log",
        value: function log() {}
    }]);

    return _default;
}();

exports.default = _default;