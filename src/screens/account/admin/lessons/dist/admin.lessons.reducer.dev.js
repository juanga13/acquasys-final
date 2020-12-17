"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _adminLessons = require("./admin.lessons.actions");

var _consts = require("../../../../utils/consts");

var _dataFormTransform = require("../../../../utils/dataFormTransform");

var _session = require("../../../session/session.actions");

var _verifyInput = _interopRequireDefault(require("../../../../utils/verifyInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  lessons: [],
  selectedLesson: null,
  modalState: _consts.MODAL_STATES.CLOSED,
  getLessonsStatus: _consts.REQUEST_STATUS.NONE,
  createLessonStatus: _consts.REQUEST_STATUS.NONE,
  updateLessonStatus: _consts.REQUEST_STATUS.NONE,
  deleteLessonStatus: _consts.REQUEST_STATUS.NONE,
  lessonForm: {
    name: {
      id: 'name',
      value: '',
      error: false,
      type: _consts.FIELD_TYPES.STRING,
      placeholder: 'forms.name',
      label: 'forms.name',
      required: true
    },
    startDate: {
      id: 'startDate',
      value: new Date().getTime(),
      error: false,
      type: _consts.FIELD_TYPES.DATE,
      placeholder: 'forms.startDate',
      label: 'forms.startDate',
      required: true
    },
    endDate: {
      id: 'endDate',
      value: new Date().getTime(),
      error: false,
      type: _consts.FIELD_TYPES.DATE,
      placeholder: 'forms.endDate',
      label: 'forms.endDate',
      required: true
    },
    students: {
      id: 'students',
      value: [],
      error: false,
      type: _consts.FIELD_TYPES.NULL,
      placeholder: 'forms.students',
      label: 'forms.students',
      required: false
    },
    teachers: {
      id: 'teachers',
      value: [],
      error: false,
      type: _consts.FIELD_TYPES.NULL,
      placeholder: 'forms.teachers',
      label: 'forms.teachers',
      required: false
    },
    weekdays: {
      id: 'weekdays',
      value: [],
      error: false,
      type: _consts.FIELD_TYPES.NULL,
      placeholder: 'forms.weekdays',
      label: 'forms.weekdays',
      required: true
    } // id: {id: 'id', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.id', label: 'forms.id', required: false },

  },
  attendances: {
    attendance: {},
    possibleDates: [],
    students: []
  },
  getAttendanceStatus: _consts.REQUEST_STATUS.NONE,
  setAttendanceStatus: _consts.REQUEST_STATUS.NONE
};

var adminLessonsReducer = function adminLessonsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _adminLessons.ADMIN_GET_LESSONS:
      return _objectSpread({}, state, {
        getLessonsStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _adminLessons.ADMIN_GET_LESSONS_SUCCESS:
      return _objectSpread({}, state, {
        getLessonsStatus: _consts.REQUEST_STATUS.SUCCESS,
        lessons: action.response
      });

    case _adminLessons.ADMIN_GET_LESSONS_ERROR:
      return _objectSpread({}, state, {
        getLessonsStatus: _consts.REQUEST_STATUS.ERROR
      });

    case _adminLessons.ADMIN_LESSONS_INPUT_CHANGE:
      var id = action.id,
          typeD = action.typeD,
          value = action.value;
      var error = !(0, _verifyInput["default"])(id, typeD, value);
      return _objectSpread({}, state, {
        lessonForm: _objectSpread({}, state.lessonForm, _defineProperty({}, id, _objectSpread({}, state.lessonForm[id], {
          value: value,
          error: error
        })))
      });

    case _adminLessons.ADMIN_LESSONS_CHANGE_MODAL_STATE:
      // si pasa a edicion poblar el form con los datos del selectedLesson
      if (action.modalState === _consts.MODAL_STATES.EDIT) {
        var newLessonForm = (0, _dataFormTransform.dataToFormTransform)(state.selectedLesson, state.lessonForm);
        return _objectSpread({}, state, {
          modalState: action.modalState,
          lessonForm: newLessonForm
        });
      } // preview utiliza selectedLesson solo, delete utiliza data solo y create utiliza el form solo


      return _objectSpread({}, state, {
        modalState: action.modalState,
        lessonForm: initialState.lessonForm
      });

    case _adminLessons.ADMIN_SELECT_LESSON:
      return _objectSpread({}, state, {
        selectedLesson: action.lesson
      });

    case _adminLessons.CREATE_LESSON:
      return _objectSpread({}, state, {
        createLessonStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _adminLessons.CREATE_LESSON_SUCCESS:
      return _objectSpread({}, state, {
        createLessonStatus: _consts.REQUEST_STATUS.SUCCESS
      });

    case _adminLessons.CREATE_LESSON_ERROR:
      return _objectSpread({}, state, {
        createLessonStatus: _consts.REQUEST_STATUS.ERROR
      });

    case _adminLessons.UPDATE_LESSON:
      return _objectSpread({}, state, {
        updateLessonStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _adminLessons.UPDATE_LESSON_SUCCESS:
      return _objectSpread({}, state, {
        updateLessonStatus: _consts.REQUEST_STATUS.SUCCESS
      });

    case _adminLessons.UPDATE_LESSON_ERROR:
      return _objectSpread({}, state, {
        updateLessonStatus: _consts.REQUEST_STATUS.ERROR
      });

    case _adminLessons.DELETE_LESSON:
      return _objectSpread({}, state, {
        deleteLessonStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _adminLessons.DELETE_LESSON_SUCCESS:
      return _objectSpread({}, state, {
        deleteLessonStatus: _consts.REQUEST_STATUS.SUCCESS
      });

    case _adminLessons.DELETE_LESSON_ERROR:
      return _objectSpread({}, state, {
        deleteLessonStatus: _consts.REQUEST_STATUS.ERROR
      });

    case _adminLessons.ADMIN_GET_ATTENDANCES:
      return _objectSpread({}, state, {
        getAttendanceStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _adminLessons.ADMIN_GET_ATTENDANCES_SUCCESS:
      return _objectSpread({}, state, {
        getAttendanceStatus: _consts.REQUEST_STATUS.SUCCESS,
        attendances: action.response
      });

    case _adminLessons.ADMIN_GET_ATTENDANCES_ERROR:
      return _objectSpread({}, state, {
        getAttendancestatus: _consts.REQUEST_STATUS.ERROR
      });

    case _adminLessons.ADMIN_SET_ATTENDANCE:
      return _objectSpread({}, state, {
        setAttendanceStatus: _consts.REQUEST_STATUS.LOADING
      });

    case _adminLessons.ADMIN_SET_ATTENDANCE_SUCCESS:
      return _objectSpread({}, state, {
        setAttendanceStatus: _consts.REQUEST_STATUS.SUCCESS
      });

    case _adminLessons.ADMIN_SET_ATTENDANCE_ERROR:
      return _objectSpread({}, state, {
        setAttendanceStatus: _consts.REQUEST_STATUS.ERROR
      });

    case _session.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

var _default = adminLessonsReducer;
exports["default"] = _default;