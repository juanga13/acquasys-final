"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "StudentCalendar", {
  enumerable: true,
  get: function get() {
    return _Calendar["default"];
  }
});
Object.defineProperty(exports, "StudentLessons", {
  enumerable: true,
  get: function get() {
    return _Lessons["default"];
  }
});
Object.defineProperty(exports, "StudentProfile", {
  enumerable: true,
  get: function get() {
    return _Profile["default"];
  }
});

var _Calendar = _interopRequireDefault(require("./components/Calendar"));

var _Lessons = _interopRequireDefault(require("./components/Lessons"));

var _Profile = _interopRequireDefault(require("./components/Profile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }