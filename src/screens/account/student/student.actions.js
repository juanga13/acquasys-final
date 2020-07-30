export const STUDENT_GET_LESSONS = 'STUDENT_GET_LESSONS';
export const STUDENT_GET_LESSONS_SUCCESS = 'STUDENT_GET_LESSONS_SUCCESS';
export const STUDENT_GET_LESSONS_ERROR = 'STUDENT_GET_LESSONS_ERROR';

export const STUDENT_GET_PAYMENTS = 'GET_PAYMENTS';
export const STUDENT_GET_PAYMENTS_SUCCESS = 'GET_PAYMENTS_SUCCESS';
export const STUDENT_GET_PAYMENTS_ERROR = 'GET_PAYMENTS_ERROR';

export const STUDENT_SELECT_PAYMENT = 'STUDENT_SELECT_PAYMENT';

export const STUDENT_GET_CALENDAR = 'GET_CALENDAR';
export const STUDENT_GET_CALENDAR_SUCCESS = 'GET_CALENDAR_SUCCESS';
export const STUDENT_GET_CALENDAR_ERROR = 'GET_CALENDAR_ERROR';

export const SUBSCRIBE_LESSON = 'SUBSCRIBE_LESSON';
export const SUBSCRIBE_LESSON_SUCCESS = 'SUBSCRIBE_LESSON_SUCCESS';
export const SUBSCRIBE_LESSON_ERROR = 'SUBSCRIBE_LESSON_ERROR';

export const UNSUBSCRIBE_LESSON = 'UNSUBSCRIBE_LESSON';
export const UNSUBSCRIBE_LESSON_SUCCESS = 'UNSUBSCRIBE_LESSON_SUCCESS';
export const UNSUBSCRIBE_LESSON_ERROR = 'UNSUBSCRIBE_LESSON_ERROR';

export const STUDENT_CHANGE_MODAL_STATE = 'STUDENT_CHANGE_MODAL_STATE';
// export const STUDENT_INPUT_CHANGE = 'STUDENT_INPUT_CHANGE';


const studentActions = {
    getLessons: () => ({type: STUDENT_GET_LESSONS}),
    getLessonsSuccess: (response) => ({type: STUDENT_GET_LESSONS_SUCCESS, response}),
    getLessonsError: () => ({type: STUDENT_GET_LESSONS_ERROR}),

    getPayments: (startDate, endDate) => ({type: STUDENT_GET_PAYMENTS, startDate, endDate }),
    getPaymentsSuccess: (response) => ({type: STUDENT_GET_PAYMENTS_SUCCESS, response}),
    getPaymentsError: () => ({type: STUDENT_GET_PAYMENTS_ERROR}),

    getCalendar: () => ({type: STUDENT_GET_CALENDAR}),
    getCalendarSuccess: (response) => ({type: STUDENT_GET_CALENDAR_SUCCESS, response}),
    getCalendarError: () => ({type: STUDENT_GET_CALENDAR_ERROR}),

    subscribeLesson: (lesson, student) => ({type: SUBSCRIBE_LESSON, lesson, student}),
    subscribeLessonSuccess: () => ({type: SUBSCRIBE_LESSON_SUCCESS}),
    subscribeLessonError: () => ({type: SUBSCRIBE_LESSON_ERROR}),

    unsubscribeLesson: () => ({type: UNSUBSCRIBE_LESSON}),
    unsubscribeLessonSuccess: () => ({type: UNSUBSCRIBE_LESSON_SUCCESS}),
    unsubscribeLessonError: () => ({type: UNSUBSCRIBE_LESSON_ERROR}),

    studentChangeModalState: () => ({type: STUDENT_CHANGE_MODAL_STATE}),
    // studentInputChange: () => ({type: STUDENT_INPUT_CHANGE}),
};

export default studentActions;