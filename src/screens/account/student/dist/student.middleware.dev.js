"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactReduxI18n = require("react-redux-i18n");

var _time = require("../../../utils/time");

var _Toaster = _interopRequireDefault(require("../../common/components/Toaster"));

var _student = _interopRequireWildcard(require("./student.actions"));

var _student2 = _interopRequireDefault(require("./student.services"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var studentMiddleware = function studentMiddleware(_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {
      next(action);

      switch (action.type) {
        case _student.STUDENT_GET_LESSONS:
          _student2["default"].getLessons().then(function (response) {
            return dispatch(_student["default"].getLessonsSuccess(response));
          })["catch"](function () {
            return dispatch(_student["default"].getLessonsError());
          });

          break;

        case _student.STUDENT_GET_CALENDAR:
          _student2["default"].getCalendar(action.startDate, action.endDate).then(function (response) {
            return dispatch(_student["default"].getCalendarSuccess(response));
          })["catch"](function () {
            return dispatch(_student["default"].getCalendarError());
          });

          break;

        case _student.SUBSCRIBE_LESSON:
          _student2["default"].suscribe(action.studentId, action.lessonId).then(function (response) {
            dispatch(_student["default"].subscribeLessonSuccess(response));
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('student.lessons.success.suscribe.title'), _reactReduxI18n.I18n.t('student.lessons.success.suscribe.description'), 'success', 'check');
            dispatch(_student["default"].getMyEnrolled());
            dispatch(_student["default"].getCalendar((0, _time.tenDaysBeforeNow)().getTime(), new Date().getTime()));
          })["catch"](function (error) {
            dispatch(_student["default"].subscribeLessonError(error));
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('student.lessons.error.suscribe.title'), _reactReduxI18n.I18n.t('student.lessons.error.suscribe.title'), 'error', 'warning');
          });

          break;

        case _student.UNSUBSCRIBE_LESSON:
          _student2["default"].unsuscribe(action.studentId, action.lessonId).then(function (response) {
            dispatch(_student["default"].unsubscribeLessonSuccess(response));
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('student.lessons.success.unsuscribe.title'), _reactReduxI18n.I18n.t('student.lessons.success.unsuscribe.description'), 'success', 'check');
            dispatch(_student["default"].getMyEnrolled());
            dispatch(_student["default"].getCalendar((0, _time.tenDaysBeforeNow)().getTime(), new Date().getTime()));
          })["catch"](function (error) {
            dispatch(_student["default"].unsubscribeLessonError(error));
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('student.lessons.error.unsuscribe.title'), _reactReduxI18n.I18n.t('student.lessons.error.unsuscribe.description'), 'error', 'warning');
          });

          break;

        case _student.GET_MY_ENROLLED:
          _student2["default"].getMyEnrolled().then(function (response) {
            dispatch(_student["default"].getMyEnrolledSuccess(response));
          })["catch"](function (error) {
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('student.lessons.error.enrollData.title'), _reactReduxI18n.I18n.t('student.lessons.error.enrollData.description'), 'error', 'warning');
            dispatch(_student["default"].getMyEnrolledError(error));
          });

          break;

        case _student.GET_MYSELF_DATA:
          _student2["default"].getMyselfData().then(function (response) {
            dispatch(_student["default"].getMyselfDataSuccess(response));
          })["catch"](function (error) {
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('student.lessons.error.myData.title'), _reactReduxI18n.I18n.t('student.lessons.error.myData.description'), 'error', 'warning');
            dispatch(_student["default"].getMyselfDataError(error));
          });

          break;

        case _student.STUDENT_GET_ATTENDANCES:
          _student2["default"].getAttendance(action.id).then(function (response) {
            dispatch(_student["default"].studentGetAttendancesSuccess(response));
          })["catch"](function (error) {
            dispatch(_student["default"].studentGetAttendancesError());
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('student.lessons.error.getAttendance.title'), _reactReduxI18n.I18n.t('student.lessons.error.getAttendance.description'), 'error', 'warning');
          });

          break;

        case _student.STUDENT_SELECT_LESSON:
          if (!!action.lesson && action.getAttendances) dispatch(_student["default"].studentGetAttendances(action.lesson.id));
          break;

        default:
          break;
      }
    };
  };
};

var _default = studentMiddleware;
exports["default"] = _default;