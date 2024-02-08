"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _wrappedValues = require("../values/wrapped-values");
var _log = _interopRequireDefault(require("../utilities/log"));
var _external = _interopRequireDefault(require("../external"));
var _z3javascript = _interopRequireDefault(require("z3javascript"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var find = Array.prototype.find;
function _default(state, ctx, model, helpers) {
  function symbolicStringify(field) {
    if (field === undefined) {
      return undefined;
    } else if (field === null) {
      return "null";
    } else if (state.getConcrete(field) instanceof Array) {
      var rstr = '[';
      field = state.getConcrete(field);
      for (var i = 0; i < field.length; i++) {
        if (i > 0) {
          rstr = state.binary('+', rstr, ', ');
        }
        rstr = state.binary('+', rstr, symbolicStringify(field[i]));
      }
      rstr = state.binary('+', rstr, ']');
      return rstr;
    } else if (state.getConcrete(field) instanceof Object) {
      var _rstr = '{';
      var first = true;
      var _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(field)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          var name = state.binary('+', '"', state.binary('+', key, '"'));
          var encodedField = symbolicStringify(field[key]);
          var merged = state.binary('+', name, state.binary('+', ':', encodedField));
          if (!first) {
            _rstr = state.binary('+', _rstr, ',');
          }
          _rstr = state.binary('+', _rstr, merged);
          first = false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      _rstr = state.binary('+', _rstr, '}');
      return _rstr;
    } else if (typeof state.getConcrete(field) === "string") {
      return state.binary('+', '"', state.binary('+', field, '"'));
    } else {
      return helpers.coerceToString(field);
    }
  }
  model.add(JSON.stringify, function (base, args) {
    var result = symbolicStringify(args[0]);
    return result;
  });
}