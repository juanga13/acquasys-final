"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _adminLessons = _interopRequireWildcard(require("./admin.lessons.actions"));

var _adminLessons2 = _interopRequireDefault(require("./admin.lessons.services"));

var _consts = require("../../../../utils/consts");

var _dataFormTransform = require("../../../../utils/dataFormTransform");

var _reactReduxI18n = require("react-redux-i18n");

var _Toaster = _interopRequireDefault(require("../../../common/components/Toaster"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var adminLessonsMiddleware = function adminLessonsMiddleware(_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {
      next(action);

      switch (action.type) {
        case _adminLessons.ADMIN_GET_LESSONS:
          _adminLessons2["default"].getLessons().then(function (response) {
            return dispatch(_adminLessons["default"].getLessonsSuccess(response));
          })["catch"](function () {
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('admin.lessons.error.get.title'), _reactReduxI18n.I18n.t('admin.lessons.error.get.description'), 'error', 'warning');
            dispatch(_adminLessons["default"].getLessonsError());
          });

          break;

        case _adminLessons.ADMIN_LESSONS_CHANGE_MODAL_STATE:
          action.modalState === _consts.MODAL_STATES.CLOSED && dispatch(_adminLessons["default"].selectLesson(null));
          break;

        case _adminLessons.CREATE_LESSON:
          var createLessonForm = getState().admin.lessons.lessonForm;
          var createData = (0, _dataFormTransform.formToDataTransform)(createLessonForm); // take missing data (not shown in form) and add it in order to make the request
          // take data from getState().selectedLesson and insert it into data!

          createData.id = 0; // if (createData.password.value === '') {
          //     createData.password.value = 'asd123';
          // }

          _adminLessons2["default"].createLesson(createData).then(function () {
            dispatch(_adminLessons["default"].createLessonSuccess());
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('admin.lessons.success.create.title'), _reactReduxI18n.I18n.t('admin.lessons.success.create.description'), 'success', 'check');
            dispatch(_adminLessons["default"].getLessons());
            dispatch(_adminLessons["default"].adminLessonsChangeModalState(_consts.MODAL_STATES.CLOSED));
          })["catch"](function () {
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('admin.lessons.error.create.title'), _reactReduxI18n.I18n.t('admin.lessons.error.create.description'), 'error', 'warning');
            dispatch(_adminLessons["default"].createLessonError());
          });

          break;

        case _adminLessons.UPDATE_LESSON:
          var updateSelectedLesson = getState().admin.lessons.selectedLesson;
          var updateData = (0, _dataFormTransform.formToDataTransform)(getState().admin.lessons.lessonForm); // take missing data (not shown in form) and add it in order to make the request
          // take data from getState().selectedLesson and insert it into data!

          updateData.id = updateSelectedLesson.id;
          updateData.role = updateSelectedLesson.role;
          updateData.students = updateData.students.map(function (student) {
            return student.id;
          });
          updateData.teachers = updateData.teachers.map(function (teacher) {
            return teacher.id;
          }); // if (updateData.password === '') {
          //     updateData.password = updateSelectedLesson.password;
          // }

          _adminLessons2["default"].updateLesson(updateData).then(function () {
            dispatch(_adminLessons["default"].updateLessonSuccess());
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('admin.lessons.success.update.title'), _reactReduxI18n.I18n.t('admin.lessons.success.update.description'), 'success', 'check');
            dispatch(_adminLessons["default"].getLessons());
            dispatch(_adminLessons["default"].adminLessonsChangeModalState(_consts.MODAL_STATES.CLOSED));
          })["catch"](function () {
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('admin.lessons.error.update.title'), _reactReduxI18n.I18n.t('admin.lessons.error.update.description'), 'error', 'warning');
            dispatch(_adminLessons["default"].updateLessonError());
          });

          break;

        case _adminLessons.DELETE_LESSON:
          _adminLessons2["default"].deleteLesson(action.id).then(function () {
            dispatch(_adminLessons["default"].deleteLessonSuccess());
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('admin.lessons.success.delete.title'), _reactReduxI18n.I18n.t('admin.lessons.success.delete.description'), 'success', 'check');
            dispatch(_adminLessons["default"].selectLesson(null));
            dispatch(_adminLessons["default"].getLessons());
            dispatch(_adminLessons["default"].adminLessonsChangeModalState(_consts.MODAL_STATES.CLOSED));
          })["catch"](function () {
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('admin.lessons.error.delete.title'), _reactReduxI18n.I18n.t('admin.lessons.error.delete.description'), 'error', 'warning');
            dispatch(_adminLessons["default"].deleteLessonError());
          });

          break;

        case _adminLessons.ADMIN_SELECT_LESSON:
          if (!!action.lesson) dispatch(_adminLessons["default"].getAttendances(action.lesson.id));
          break;

        case _adminLessons.ADMIN_GET_ATTENDANCES:
          _adminLessons2["default"].getAttendances(action.id).then(function (response) {
            dispatch(_adminLessons["default"].getAttendancesSuccess(response));
          })["catch"](function (error) {
            dispatch(_adminLessons["default"].getAttendancesError());
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('admin.lessons.error.getAttendance.title'), _reactReduxI18n.I18n.t('admin.lessons.error.getAttendance.description'), 'error', 'warning');
          });

          break;

        case _adminLessons.ADMIN_SET_ATTENDANCE:
          _adminLessons2["default"].setAttendance(action.attendance).then(function (response) {
            dispatch(_adminLessons["default"].setAttendanceSuccess());
            dispatch(_adminLessons["default"].getAttendances(getState().admin.lessons.selectedLesson.id));
          })["catch"](function (error) {
            dispatch(_adminLessons["default"].setAttendanceError());
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('admin.lessons.error.setAttendance.title'), _reactReduxI18n.I18n.t('admin.lessons.error.setAttendance.title'), 'error', 'warning');
          });

          break;

        default:
          break;
      }
    };
  };
};

var _default = adminLessonsMiddleware;
exports["default"] = _default;