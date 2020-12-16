"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UNSUBSCRIBE_LESSON_ERROR = exports.UNSUBSCRIBE_LESSON_SUCCESS = exports.UNSUBSCRIBE_LESSON = exports.SUBSCRIBE_LESSON_ERROR = exports.SUBSCRIBE_LESSON_SUCCESS = exports.SUBSCRIBE_LESSON = exports.STUDENT_GET_ATTENDANCES_ERROR = exports.STUDENT_GET_ATTENDANCES_SUCCESS = exports.STUDENT_GET_ATTENDANCES = exports.STUDENT_GET_LESSONS_ERROR = exports.STUDENT_GET_LESSONS_SUCCESS = exports.STUDENT_GET_LESSONS = exports.STUDENT_SELECT_LESSON = exports.STUDENT_LESSONS_CHANGE_MODAL_STATE = exports.STUDENT_GET_CALENDAR_ERROR = exports.STUDENT_GET_CALENDAR_SUCCESS = exports.STUDENT_GET_CALENDAR = exports.STUDENT_INPUT_CHANGE = exports.STUDENT_CHANGE_MODAL_STATE = exports.GET_MYSELF_DATA_ERROR = exports.GET_MYSELF_DATA_SUCCESS = exports.GET_MYSELF_DATA = exports.GET_MY_ENROLLED_ERROR = exports.GET_MY_ENROLLED_SUCCESS = exports.GET_MY_ENROLLED = void 0;

/* profile and other */
var GET_MY_ENROLLED = 'GET_MY_ENROLLED';
exports.GET_MY_ENROLLED = GET_MY_ENROLLED;
var GET_MY_ENROLLED_SUCCESS = 'GET_MY_ENROLLED_SUCCESS';
exports.GET_MY_ENROLLED_SUCCESS = GET_MY_ENROLLED_SUCCESS;
var GET_MY_ENROLLED_ERROR = 'GET_MY_ENROLLED_ERROR';
exports.GET_MY_ENROLLED_ERROR = GET_MY_ENROLLED_ERROR;
var GET_MYSELF_DATA = 'GET_MYSELF_DATA';
exports.GET_MYSELF_DATA = GET_MYSELF_DATA;
var GET_MYSELF_DATA_SUCCESS = 'GET_MYSELF_DATA_SUCCESS';
exports.GET_MYSELF_DATA_SUCCESS = GET_MYSELF_DATA_SUCCESS;
var GET_MYSELF_DATA_ERROR = 'GET_MYSELF_DATA_ERROR';
exports.GET_MYSELF_DATA_ERROR = GET_MYSELF_DATA_ERROR;
var STUDENT_CHANGE_MODAL_STATE = 'STUDENT_CHANGE_MODAL_STATE';
exports.STUDENT_CHANGE_MODAL_STATE = STUDENT_CHANGE_MODAL_STATE;
var STUDENT_INPUT_CHANGE = 'STUDENT_INPUT_CHANGE';
/* calendar */

exports.STUDENT_INPUT_CHANGE = STUDENT_INPUT_CHANGE;
var STUDENT_GET_CALENDAR = 'GET_CALENDAR';
exports.STUDENT_GET_CALENDAR = STUDENT_GET_CALENDAR;
var STUDENT_GET_CALENDAR_SUCCESS = 'GET_CALENDAR_SUCCESS';
exports.STUDENT_GET_CALENDAR_SUCCESS = STUDENT_GET_CALENDAR_SUCCESS;
var STUDENT_GET_CALENDAR_ERROR = 'GET_CALENDAR_ERROR';
/* lessons */

exports.STUDENT_GET_CALENDAR_ERROR = STUDENT_GET_CALENDAR_ERROR;
var STUDENT_LESSONS_CHANGE_MODAL_STATE = 'STUDENT_LESSONS_CHANGE_MODAL_STATE';
exports.STUDENT_LESSONS_CHANGE_MODAL_STATE = STUDENT_LESSONS_CHANGE_MODAL_STATE;
var STUDENT_SELECT_LESSON = 'STUDENT_SELECT_LESSON';
exports.STUDENT_SELECT_LESSON = STUDENT_SELECT_LESSON;
var STUDENT_GET_LESSONS = 'STUDENT_GET_LESSONS';
exports.STUDENT_GET_LESSONS = STUDENT_GET_LESSONS;
var STUDENT_GET_LESSONS_SUCCESS = 'STUDENT_GET_LESSONS_SUCCESS';
exports.STUDENT_GET_LESSONS_SUCCESS = STUDENT_GET_LESSONS_SUCCESS;
var STUDENT_GET_LESSONS_ERROR = 'STUDENT_GET_LESSONS_ERROR';
exports.STUDENT_GET_LESSONS_ERROR = STUDENT_GET_LESSONS_ERROR;
var STUDENT_GET_ATTENDANCES = 'STUDENT_GET_ATTENDANCES';
exports.STUDENT_GET_ATTENDANCES = STUDENT_GET_ATTENDANCES;
var STUDENT_GET_ATTENDANCES_SUCCESS = 'STUDENT_GET_ATTENDANCES_SUCCESS';
exports.STUDENT_GET_ATTENDANCES_SUCCESS = STUDENT_GET_ATTENDANCES_SUCCESS;
var STUDENT_GET_ATTENDANCES_ERROR = 'STUDENT_GET_ATTENDANCES_ERROR';
exports.STUDENT_GET_ATTENDANCES_ERROR = STUDENT_GET_ATTENDANCES_ERROR;
var SUBSCRIBE_LESSON = 'SUBSCRIBE_LESSON';
exports.SUBSCRIBE_LESSON = SUBSCRIBE_LESSON;
var SUBSCRIBE_LESSON_SUCCESS = 'SUBSCRIBE_LESSON_SUCCESS';
exports.SUBSCRIBE_LESSON_SUCCESS = SUBSCRIBE_LESSON_SUCCESS;
var SUBSCRIBE_LESSON_ERROR = 'SUBSCRIBE_LESSON_ERROR';
exports.SUBSCRIBE_LESSON_ERROR = SUBSCRIBE_LESSON_ERROR;
var UNSUBSCRIBE_LESSON = 'UNSUBSCRIBE_LESSON';
exports.UNSUBSCRIBE_LESSON = UNSUBSCRIBE_LESSON;
var UNSUBSCRIBE_LESSON_SUCCESS = 'UNSUBSCRIBE_LESSON_SUCCESS';
exports.UNSUBSCRIBE_LESSON_SUCCESS = UNSUBSCRIBE_LESSON_SUCCESS;
var UNSUBSCRIBE_LESSON_ERROR = 'UNSUBSCRIBE_LESSON_ERROR';
exports.UNSUBSCRIBE_LESSON_ERROR = UNSUBSCRIBE_LESSON_ERROR;
var studentActions = {
  /* profile and other */
  getMyEnrolled: function getMyEnrolled() {
    return {
      type: GET_MY_ENROLLED
    };
  },
  getMyEnrolledSuccess: function getMyEnrolledSuccess(response) {
    return {
      type: GET_MY_ENROLLED_SUCCESS,
      response: response
    };
  },
  getMyEnrolledError: function getMyEnrolledError(error) {
    return {
      type: GET_MY_ENROLLED_ERROR,
      error: error
    };
  },
  getMyselfData: function getMyselfData() {
    return {
      type: GET_MYSELF_DATA
    };
  },
  getMyselfDataSuccess: function getMyselfDataSuccess(response) {
    return {
      type: GET_MYSELF_DATA_SUCCESS,
      response: response
    };
  },
  getMyselfDataError: function getMyselfDataError(error) {
    return {
      type: GET_MYSELF_DATA_ERROR,
      error: error
    };
  },
  studentChangeModalState: function studentChangeModalState(modalState) {
    return {
      type: STUDENT_CHANGE_MODAL_STATE,
      modalState: modalState
    };
  },
  studentInputChange: function studentInputChange(id, typeD, value) {
    return {
      type: STUDENT_INPUT_CHANGE,
      id: id,
      typeD: typeD,
      value: value
    };
  },
  studentSelectLesson: function studentSelectLesson(lesson, getAttendances) {
    return {
      type: STUDENT_SELECT_LESSON,
      lesson: lesson,
      getAttendances: getAttendances
    };
  },
  studentLessonsChangeModalState: function studentLessonsChangeModalState(modalState) {
    return {
      type: STUDENT_LESSONS_CHANGE_MODAL_STATE,
      modalState: modalState
    };
  },

  /* calendar */
  getCalendar: function getCalendar(startDate, endDate) {
    return {
      type: STUDENT_GET_CALENDAR,
      startDate: startDate,
      endDate: endDate
    };
  },
  getCalendarSuccess: function getCalendarSuccess(response) {
    return {
      type: STUDENT_GET_CALENDAR_SUCCESS,
      response: response
    };
  },
  getCalendarError: function getCalendarError() {
    return {
      type: STUDENT_GET_CALENDAR_ERROR
    };
  },

  /* lessons */
  getLessons: function getLessons() {
    return {
      type: STUDENT_GET_LESSONS
    };
  },
  getLessonsSuccess: function getLessonsSuccess(response) {
    return {
      type: STUDENT_GET_LESSONS_SUCCESS,
      response: response
    };
  },
  getLessonsError: function getLessonsError() {
    return {
      type: STUDENT_GET_LESSONS_ERROR
    };
  },
  studentGetAttendances: function studentGetAttendances(id) {
    return {
      type: STUDENT_GET_ATTENDANCES,
      id: id
    };
  },
  studentGetAttendancesSuccess: function studentGetAttendancesSuccess(attendances) {
    return {
      type: STUDENT_GET_ATTENDANCES_SUCCESS,
      attendances: attendances
    };
  },
  studentGetAttendancesError: function studentGetAttendancesError() {
    return {
      type: STUDENT_GET_ATTENDANCES_ERROR
    };
  },
  subscribeLesson: function subscribeLesson(studentId, lessonId) {
    return {
      type: SUBSCRIBE_LESSON,
      studentId: studentId,
      lessonId: lessonId
    };
  },
  subscribeLessonSuccess: function subscribeLessonSuccess() {
    return {
      type: SUBSCRIBE_LESSON_SUCCESS
    };
  },
  subscribeLessonError: function subscribeLessonError() {
    return {
      type: SUBSCRIBE_LESSON_ERROR
    };
  },
  unsubscribeLesson: function unsubscribeLesson(studentId, lessonId) {
    return {
      type: UNSUBSCRIBE_LESSON,
      studentId: studentId,
      lessonId: lessonId
    };
  },
  unsubscribeLessonSuccess: function unsubscribeLessonSuccess() {
    return {
      type: UNSUBSCRIBE_LESSON_SUCCESS
    };
  },
  unsubscribeLessonError: function unsubscribeLessonError() {
    return {
      type: UNSUBSCRIBE_LESSON_ERROR
    };
  }
};
var _default = studentActions;
exports["default"] = _default;