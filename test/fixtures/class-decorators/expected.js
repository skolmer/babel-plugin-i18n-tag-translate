"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Test2 = exports.Test = void 0;

var _es2015I18nTag = _interopRequireWildcard(require("es2015-i18n-tag"));

var _dec, _class, _dec2, _class3;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject9() {
  var data = _taggedTemplateLiteral(["Willkommen!"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["Hallo!"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["Hello ", ", you have ", ":c in your bank account."]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["Willkommen!"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["Hallo!"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Hallo ", ", Sie haben ", ":c auf Ihrem Bankkonto."]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["Willkommen!"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Hallo!"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Sie haben ", ":c auf Ihrem Bankkonto, ", "."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __translationGroup = "fixtures/class-decorators/actual.js";
(0, _es2015I18nTag.i18nConfig)({
  "translations": {
    "key": "value"
  },
  "date": {
    "hour12": true
  }
});
var Test = (_dec = (0, _es2015I18nTag.i18nGroup)('custom group'), _dec(_class =
/*#__PURE__*/
function () {
  function Test() {
    _classCallCheck(this, Test);
  }

  _createClass(Test, [{
    key: "log",
    value: function log() {
      console.log(this.i18n(_templateObject(), amount, name));
      console.log((0, _es2015I18nTag.default)('custom inline group')(_templateObject2()));
      console.log(this.i18n('custom inline group')(_templateObject3()));
    }
  }]);

  return Test;
}()) || _class);
exports.Test = Test;

var TestX =
/*#__PURE__*/
function () {
  function TestX() {
    _classCallCheck(this, TestX);
  }

  _createClass(TestX, [{
    key: "log",
    value: function log() {
      console.log(this.i18n(_templateObject4(), name, amount));
      console.log((0, _es2015I18nTag.default)('custom inline group')(_templateObject5()));
      console.log(this.i18n('custom inline group')(_templateObject6()));
    }
  }]);

  return TestX;
}();

var Test2 = (0, _es2015I18nTag.i18nGroup)('custom group 2')(TestX); // anonymous class

exports.Test2 = Test2;

var _class2 = (_dec2 = (0, _es2015I18nTag.i18nGroup)('custom group 3'), _dec2(_class3 =
/*#__PURE__*/
function () {
  function _class3() {
    _classCallCheck(this, _class3);
  }

  _createClass(_class3, [{
    key: "log",
    value: function log() {
      console.log(this.i18n(_templateObject7(), name, amount));
      console.log((0, _es2015I18nTag.default)('custom inline group')(_templateObject8()));
      console.log(this.i18n('custom inline group')(_templateObject9()));
    }
  }]);

  return _class3;
}()) || _class3);

exports.default = _class2;