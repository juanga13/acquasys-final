/* profile and other */
export const GET_MY_ENROLLED = 'GET_MY_ENROLLED';
export const GET_MY_ENROLLED_SUCCESS = 'GET_MY_ENROLLED_SUCCESS';
export const GET_MY_ENROLLED_ERROR = 'GET_MY_ENROLLED_ERROR';

export const GET_MYSELF_DATA = 'GET_MYSELF_DATA';
export const GET_MYSELF_DATA_SUCCESS = 'GET_MYSELF_DATA_SUCCESS';
export const GET_MYSELF_DATA_ERROR = 'GET_MYSELF_DATA_ERROR';

export const STUDENT_CHANGE_MODAL_STATE = 'STUDENT_CHANGE_MODAL_STATE';
export const STUDENT_INPUT_CHANGE = 'STUDENT_INPUT_CHANGE';

// export const UPDATE_MY_DATA_REQUEST = 'UPDATE_DATA_REQUEST';
// export const UPDATE_MY_DATA_REQUEST_SUCCESS = 'UPDATE_DATA_REQUEST_SUCCESS';
// export const UPDATE_MY_DATA_REQUEST_ERROR = 'UPDATE_DATA_REQUEST_ERROR';

/* calendar */
export const STUDENT_GET_CALENDAR = 'GET_CALENDAR';
export const STUDENT_GET_CALENDAR_SUCCESS = 'GET_CALENDAR_SUCCESS';
export const STUDENT_GET_CALENDAR_ERROR = 'GET_CALENDAR_ERROR';

/* lessons */
export const STUDENT_LESSONS_CHANGE_MODAL_STATE = 'STUDENT_LESSONS_CHANGE_MODAL_STATE';
export const STUDENT_SELECT_LESSON = 'STUDENT_SELECT_LESSON';

export const STUDENT_GET_LESSONS = 'STUDENT_GET_LESSONS';
export const STUDENT_GET_LESSONS_SUCCESS = 'STUDENT_GET_LESSONS_SUCCESS';
export const STUDENT_GET_LESSONS_ERROR = 'STUDENT_GET_LESSONS_ERROR';

export const STUDENT_GET_ATTENDANCES = 'STUDENT_GET_ATTENDANCES';
export const STUDENT_GET_ATTENDANCES_SUCCESS = 'STUDENT_GET_ATTENDANCES_SUCCESS';
export const STUDENT_GET_ATTENDANCES_ERROR = 'STUDENT_GET_ATTENDANCES_ERROR';

export const STUDENT_SET_ATTENDANCE = 'STUDENT_SET_ATTENDANCE';
export const STUDENT_SET_ATTENDANCE_SUCCESS = 'STUDENT_SET_ATTENDANCE_SUCCESS';
export const STUDENT_SET_ATTENDANCE_ERROR = 'STUDENT_SET_ATTENDANCE_ERROR';

export const SUBSCRIBE_LESSON = 'SUBSCRIBE_LESSON';
export const SUBSCRIBE_LESSON_SUCCESS = 'SUBSCRIBE_LESSON_SUCCESS';
export const SUBSCRIBE_LESSON_ERROR = 'SUBSCRIBE_LESSON_ERROR';

export const UNSUBSCRIBE_LESSON = 'UNSUBSCRIBE_LESSON';
export const UNSUBSCRIBE_LESSON_SUCCESS = 'UNSUBSCRIBE_LESSON_SUCCESS';
export const UNSUBSCRIBE_LESSON_ERROR = 'UNSUBSCRIBE_LESSON_ERROR';

/* payment */
export const STUDENT_GET_PAYMENTS = 'GET_PAYMENTS';
export const STUDENT_GET_PAYMENTS_SUCCESS = 'GET_PAYMENTS_SUCCESS';
export const STUDENT_GET_PAYMENTS_ERROR = 'GET_PAYMENTS_ERROR';

export const STUDENT_SELECT_PAYMENT = 'STUDENT_SELECT_PAYMENT';


const studentActions = {
    /* profile and other */
    getMyEnrolled: () => ({type: GET_MY_ENROLLED}),
    getMyEnrolledSuccess: (response) => ({type: GET_MY_ENROLLED_SUCCESS, response}),
    getMyEnrolledError: (error) => ({type: GET_MY_ENROLLED_ERROR, error}),
    
    getMyselfData: () => ({type: GET_MYSELF_DATA}),
    getMyselfDataSuccess: (response) => ({type: GET_MYSELF_DATA_SUCCESS, response}),
    getMyselfDataError: (error) => ({type: GET_MYSELF_DATA_ERROR, error}),
    
    studentChangeModalState: (modalState) => ({type: STUDENT_CHANGE_MODAL_STATE, modalState}),
    studentInputChange: (id, typeD, value) => ({type: STUDENT_INPUT_CHANGE, id, typeD, value}),

    studentSelectLesson: (lesson) =>  ({type: STUDENT_SELECT_LESSON, lesson}),
    studentLessonsChangeModalState: (modalState) =>  ({type: STUDENT_LESSONS_CHANGE_MODAL_STATE, modalState}),
    
    /* calendar */
    getCalendar: (startDate, endDate) => ({type: STUDENT_GET_CALENDAR, startDate, endDate}),
    getCalendarSuccess: (response) => ({type: STUDENT_GET_CALENDAR_SUCCESS, response}),
    getCalendarError: () => ({type: STUDENT_GET_CALENDAR_ERROR}),

    /* lessons */

    getLessons: () => ({type: STUDENT_GET_LESSONS}),
    getLessonsSuccess: (response) => ({type: STUDENT_GET_LESSONS_SUCCESS, response}),
    getLessonsError: () => ({type: STUDENT_GET_LESSONS_ERROR}),
    
    studentGetAttendances: () => ({type: STUDENT_GET_ATTENDANCES}),
    studentGetAttendancesSuccess: (response) => ({type: STUDENT_GET_ATTENDANCES_SUCCESS, response}),
    studentGetAttendancesError: () => ({type: STUDENT_GET_ATTENDANCES_ERROR}),

    studentSetAttendance: (attendance) => ({type: STUDENT_SET_ATTENDANCE, attendance}),
    studentSetAttendanceSuccess: () => ({type: STUDENT_SET_ATTENDANCE_SUCCESS}),
    studentSetAttendanceError: () => ({type: STUDENT_SET_ATTENDANCE_ERROR}),
    
    subscribeLesson: (lessonId, studentId) => ({type: SUBSCRIBE_LESSON, lessonId, studentId}),
    subscribeLessonSuccess: () => ({type: SUBSCRIBE_LESSON_SUCCESS}),
    subscribeLessonError: () => ({type: SUBSCRIBE_LESSON_ERROR}),

    unsubscribeLesson: () => ({type: UNSUBSCRIBE_LESSON}),
    unsubscribeLessonSuccess: () => ({type: UNSUBSCRIBE_LESSON_SUCCESS}),
    unsubscribeLessonError: () => ({type: UNSUBSCRIBE_LESSON_ERROR}),
    
    /* payment */
    getPayments: () => ({type: STUDENT_GET_PAYMENTS }),
    getPaymentsSuccess: (response) => ({type: STUDENT_GET_PAYMENTS_SUCCESS, response}),
    getPaymentsError: () => ({type: STUDENT_GET_PAYMENTS_ERROR}),

    selectPayment: (payment) => ({type: STUDENT_SELECT_PAYMENT, payment}),
};

export default studentActions;