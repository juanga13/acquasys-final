"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _student = require("./student.actions");

var _consts = require("../../../utils/consts");

var _verifyInput = _interopRequireDefault(require("../../../utils/verifyInput"));

var _dataFormTransform = require("../../../utils/dataFormTransform");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const _today = new Date();
var initialState = {
  /* profile and other */
  modalState: _consts.MODAL_STATES.CLOSED,
  myEnrolled: [],
  getMyEnrolledStatus: _consts.REQUEST_STATUS.NONE,
  myData: null,
  getMyselfDataStatus: _consts.REQUEST_STATUS.NONE,

  /* calendar */
  calendar: null,
  getCalendarStatus: _consts.REQUEST_STATUS.NONE,

  /* lessons */
  lessons: [],
  getLessonsStatus: _consts.REQUEST_STATUS.NONE,
  selectedLesson: null,
  subscribeLessonStatus: _consts.REQUEST_STATUS.NONE,
  unsubscribeLessonStatus: _consts.REQUEST_STATUS.NONE,
  attendances: [],
  getAttendancesStatus: _consts.REQUEST_STATUS.NONE
};

var studentReducer = function studentReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    /* profile and other */
    case _student.STUDENT_CHANGE_MODAL_STATE:
      if (action.modalState === _consts.MODAL_STATES.EDIT) {
        var newStudentForm = (0, _dataFormTransform.dataToFormTransform)(state.myData, state.form);
        return _objectSpread({}, state, {
          modalState: action.modalState,
          form: newStudentForm
        });
      } else {
        // preview utiliza selectedStudent solo, delete utiliza data solo y create utiliza el form solo
        return _objectSpread({}, state, {
          modalState: action.modalState,
          form: initialState.form
        });
      }

      ;

    case _student.STUDENT_INPUT_CHANGE:
      var id = action.id,
          typedD = action.typedD,
          value = action.value;
      var error = !(0, _verifyInput["default"])(id, typedD, value);
      return _objectSpread({}, state, {
        studentForm: _objectSpread({}, state.studentForm, _defineProperty({}, id, _objectSpread({}, state.studentForm[id], {
          value: value,
          error: error
        })))
      });

    case _student.GET_MY_ENROLLED:
      return _objectSpread({}, state, {
        getMyEnrolledStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _student.GET_MY_ENROLLED_SUCCESS:
      return _objectSpread({}, state, {
        getMyEnrolledStatus: _consts.REQUEST_STATUS.SUCCESS,
        myEnrolled: action.response
      });

    case _student.GET_MY_ENROLLED_ERROR:
      return _objectSpread({}, state, {
        getMyEnrolledStatus: _consts.REQUEST_STATUS.ERROR
      });

    case _student.GET_MYSELF_DATA:
      return _objectSpread({}, state, {
        getMyselfDataStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _student.GET_MYSELF_DATA_SUCCESS:
      return _objectSpread({}, state, {
        getMyselfDataStatus: _consts.REQUEST_STATUS.SUCCESS,
        myData: action.response
      });

    case _student.GET_MYSELF_DATA_ERROR:
      return _objectSpread({}, state, {
        getMyselfDataStatus: _consts.REQUEST_STATUS.ERROR
      });

    /* calendar */

    case _student.STUDENT_GET_CALENDAR:
      return _objectSpread({}, state, {
        getCalendarStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _student.STUDENT_GET_CALENDAR_SUCCESS:
      return _objectSpread({}, state, {
        getCalendarStatus: _consts.REQUEST_STATUS.SUCCESS,
        calendar: action.response
      });

    case _student.STUDENT_GET_CALENDAR_ERROR:
      return _objectSpread({}, state, {
        getCalendarStatus: _consts.REQUEST_STATUS.ERROR
      });

    /* lessons */

    case _student.STUDENT_LESSONS_CHANGE_MODAL_STATE:
      return _objectSpread({}, state, {
        modalState: action.modalState
      });

    case _student.STUDENT_SELECT_LESSON:
      return _objectSpread({}, state, {
        selectedLesson: action.lesson
      });

    case _student.STUDENT_GET_LESSONS:
      return _objectSpread({}, state, {
        getLessonsStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _student.STUDENT_GET_LESSONS_SUCCESS:
      return _objectSpread({}, state, {
        getLessonsStatus: _consts.REQUEST_STATUS.SUCCESS,
        lessons: action.response
      });

    case _student.STUDENT_GET_LESSONS_ERROR:
      return _objectSpread({}, state, {
        getLessonsStatus: _consts.REQUEST_STATUS.ERROR
      });

    case _student.SUBSCRIBE_LESSON:
      return _objectSpread({}, state, {
        subscribeLessonStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _student.SUBSCRIBE_LESSON_SUCCESS:
      return _objectSpread({}, state, {
        subscribeLessonStatus: _consts.REQUEST_STATUS.SUCCESS
      });

    case _student.SUBSCRIBE_LESSON_ERROR:
      return _objectSpread({}, state, {
        subscribeLessonStatus: _consts.REQUEST_STATUS.ERROR
      });

    case _student.UNSUBSCRIBE_LESSON:
      return _objectSpread({}, state, {
        unsubscribeLessonStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _student.UNSUBSCRIBE_LESSON_SUCCESS:
      return _objectSpread({}, state, {
        unsubscribeLessonStatus: _consts.REQUEST_STATUS.SUCCESS
      });

    case _student.UNSUBSCRIBE_LESSON_ERROR:
      return _objectSpread({}, state, {
        unsubscribeLessonStatus: _consts.REQUEST_STATUS.ERROR
      });

    case _student.STUDENT_GET_ATTENDANCES:
      return _objectSpread({}, state, {
        getAttendancesStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _student.STUDENT_GET_ATTENDANCES_SUCCESS:
      return _objectSpread({}, state, {
        getAttendancesStatus: _consts.REQUEST_STATUS.SUCCESS,
        attendances: action.attendances
      });

    case _student.STUDENT_GET_ATTENDANCES_ERROR:
      return _objectSpread({}, state, {
        getAttendancesStatus: _consts.REQUEST_STATUS.ERROR
      });

    default:
      return state;
  }
};

var _default = studentReducer;
exports["default"] = _default;