"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* Copyright (c) Royal Holloway, University of London | Contact Blake Loring (blake@parsed.uk), Duncan Mitchell (Duncan.Mitchell.2015@rhul.ac.uk), or Johannes Kinder (johannes.kinder@rhul.ac.uk) for details or support | LICENSE.md for license details */

var LAST_IID = "LAST_IID";
var IS_TOUCHED = 0x1;
var CONDITIONAL_TRUE = 0x2;
var CONDITIONAL_FALSE = 0x4;
var Coverage = /*#__PURE__*/function () {
  function Coverage() {
    _classCallCheck(this, Coverage);
    this._current = {};
    this._uniquePath = [];
  }
  _createClass(Coverage, [{
    key: "_getFile",
    value: function _getFile(file) {
      if (!this._current[file]) {
        this._current[file] = {
          smap: {},
          branches: {}
        };
      }
      return this._current[file];
    }
  }, {
    key: "_addSMap",
    value: function _addSMap(f, smap) {
      f.smap = smap;
    }
  }, {
    key: "_mergeBranches",
    value: function _mergeBranches(f, branches) {
      for (var i in branches) {
        f.branches[i] |= branches[i];
      }
    }
  }, {
    key: "_mergeLineNumbers",
    value: function _mergeLineNumbers(touched, all, smap, branches) {
      for (var idx in smap) {
        if (!isNaN(idx) && smap[idx] && smap[idx].line) {
          all.add(smap[idx].line);
        }
      }
      for (var _idx in branches) {
        if (!isNaN(_idx) && branches[_idx] && smap[_idx] && smap[_idx].line) {
          touched.add(smap[_idx].line);
        }
      }
    }
  }, {
    key: "getUniquePathNum",
    value: function getUniquePathNum() {
      return this._uniquePath.length;
    }
  }, {
    key: "_stringifyPath",
    value: function _stringifyPath(newPath) {
      var flatPath = "";
      for (var _i = 0, _Object$entries = Object.entries(newPath); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          id = _Object$entries$_i[0],
          decisionList = _Object$entries$_i[1];
        flatPath += "[".concat(id, ":").concat(decisionList.join(""), "]");
      }
      return flatPath;
    }

    /**
        * Merges new coverage data from a path with existing data
       */
  }, {
    key: "add",
    value: function add(coverage) {
      var newPath = this._stringifyPath(coverage["path"]);
      if (!this._uniquePath.includes(newPath)) {
        this._uniquePath.push(newPath);
      }
      var codeCoverage = coverage["code"];
      for (var i in codeCoverage) {
        if (i != LAST_IID) {
          var file = this._getFile(i);
          this._addSMap(file, codeCoverage[i].smap);
          this._mergeBranches(file, codeCoverage[i].branches);
        }
      }
      return this;
    }
  }, {
    key: "_termResults",
    value: function _termResults(file) {
      var found = 0;
      var total = 0;
      for (var i in file.smap) {
        total++;
        if (file.branches[i] & IS_TOUCHED) {
          found++;
        }
      }
      return {
        found: found,
        total: total,
        coverage: found / total
      };
    }
  }, {
    key: "_locResults",
    value: function _locResults(file) {
      var touchedLines = new Set();
      var totalLines = new Set();
      for (var i in file.smap) {
        var lineNumber = file.smap[i][0];
        totalLines.add(lineNumber);
        if (file.branches[i] & IS_TOUCHED) {
          touchedLines.add(lineNumber);
        }
      }
      touchedLines = Array.from(touchedLines);
      totalLines = Array.from(totalLines);
      var highestLineNumber = totalLines.reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return {
        touched: touchedLines,
        all: totalLines,
        found: touchedLines.length,
        total: highestLineNumber,
        coverage: touchedLines.length / totalLines.length
      };
    }
  }, {
    key: "_total",
    value: function _total(list, field) {
      var found = 0;
      var total = 0;
      var _iterator = _createForOfIteratorHelper(list),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var file = _step.value;
          found += file[field].found;
          total += file[field].total;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return total != 0 ? found / total : 0;
    }
  }, {
    key: "_decisionResults",
    value: function _decisionResults(file) {
      var conditionalIids = 0;
      var trueTaken = 0;
      var falseTaken = 0;
      for (var i in file.smap) {
        if (i % 4 == 0) {
          conditionalIids++;
          if (file.branches[i] & CONDITIONAL_TRUE) {
            trueTaken++;
          }
          if (file.branches[i] & CONDITIONAL_FALSE) {
            falseTaken++;
          }
        }
      }
      var totalPossibleDecisions = 2 * conditionalIids;
      return {
        trueTaken: trueTaken,
        falseTaken: falseTaken,
        totalOptions: totalPossibleDecisions,
        coverage: (trueTaken + falseTaken) / totalPossibleDecisions
      };
    }
  }, {
    key: "final",
    value: function final(includeSmap) {
      var results = [];
      for (var fileName in this._current) {
        var file = this._getFile(fileName);
        results.push({
          file: fileName,
          smap: includeSmap ? file.smap : undefined,
          branches: includeSmap ? file.branches : undefined,
          terms: this._termResults(file),
          loc: this._locResults(file),
          decisions: this._decisionResults(file)
        });
      }
      var _ref = [this._total(results, "loc"), this._total(results, "terms")],
        loc = _ref[0],
        terms = _ref[1];
      results.loc = loc;
      results.terms = terms;
      return results;
    }

    /**
        * Final without terms or lines
        * TODO: Doesn't really need to exist
        */
  }, {
    key: "current",
    value: function current() {
      var results = this["final"]();
      results.forEach(function (item) {
        delete item.loc.touched;
        delete item.loc.all;
      });
      return results;
    }
  }, {
    key: "lines",
    value: function lines() {
      return this["final"]().reduce(function (prev, next) {
        prev[next.file] = {
          all: next.loc.all,
          touched: next.loc.touched
        };
        return prev;
      }, {});
    }
  }]);
  return Coverage;
}();
var _default = exports["default"] = Coverage;