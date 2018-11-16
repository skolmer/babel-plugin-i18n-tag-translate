'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.Test2 = exports.Test = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _class2;

var _templateObject = _taggedTemplateLiteral(['Sie haben ', ':c auf Ihrem Bankkonto, ', '.'], ['Sie haben ', ':c auf Ihrem Bankkonto, ', '.']),
    _templateObject2 = _taggedTemplateLiteral(['Hallo!'], ['Hallo!']),
    _templateObject3 = _taggedTemplateLiteral(['Willkommen!'], ['Willkommen!']),
    _templateObject4 = _taggedTemplateLiteral(['Hallo ', ', Sie haben ', ':c auf Ihrem Bankkonto.'], ['Hallo ', ', Sie haben ', ':c auf Ihrem Bankkonto.']),
    _templateObject5 = _taggedTemplateLiteral(['Hello ', ', you have ', ':c in your bank account.'], ['Hello ', ', you have ', ':c in your bank account.']);

var _es2015I18nTag = require('es2015-i18n-tag');

var _es2015I18nTag2 = _interopRequireDefault(_es2015I18nTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __translationGroup = "fixtures/class-decorators/actual.js";(0, _es2015I18nTag.i18nConfig)({ "translations": { "key": "value" }, "date": { "hour12": true } });
var Test = exports.Test = (_dec = (0, _es2015I18nTag.i18nGroup)('custom group'), _dec(_class = function () {
    function Test() {
        _classCallCheck(this, Test);
    }

    _createClass(Test, [{
        key: 'log',
        value: function log() {
            console.log(this.i18n(_templateObject, amount, name));
            console.log((0, _es2015I18nTag2.default)('custom inline group')(_templateObject2));
            console.log(this.i18n('custom inline group')(_templateObject3));
        }
    }]);

    return Test;
}()) || _class);

var TestX = function () {
    function TestX() {
        _classCallCheck(this, TestX);
    }

    _createClass(TestX, [{
        key: 'log',
        value: function log() {
            console.log(this.i18n(_templateObject4, name, amount));
            console.log((0, _es2015I18nTag2.default)('custom inline group')(_templateObject2));
            console.log(this.i18n('custom inline group')(_templateObject3));
        }
    }]);

    return TestX;
}();

var Test2 = exports.Test2 = (0, _es2015I18nTag.i18nGroup)('custom group 2')(TestX);

// anonymous class

var _default = (_dec2 = (0, _es2015I18nTag.i18nGroup)('custom group 3'), _dec2(_class2 = function () {
    function _default() {
        _classCallCheck(this, _default);
    }

    _createClass(_default, [{
        key: 'log',
        value: function log() {
            console.log(this.i18n(_templateObject5, name, amount));
            console.log((0, _es2015I18nTag2.default)('custom inline group')(_templateObject2));
            console.log(this.i18n('custom inline group')(_templateObject3));
        }
    }]);

    return _default;
}()) || _class2);

exports.default = _default;