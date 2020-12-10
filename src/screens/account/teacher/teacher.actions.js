/* Profile and others */
export const GET_MYSELF_DATA = 'GET_MYSELF_DATA';
export const GET_MYSELF_DATA_SUCCESS = 'GET_MYSELF_DATA_SUCCESS';
export const GET_MYSELF_DATA_ERROR = 'GET_MYSELF_DATA_ERROR';

export const TEACHER_SELECT_LESSON = 'SELECT_LESSON';
export const TEACHER_CHANGE_MODAL_STATE = 'TEACHER_CHANGE_MODAL_STATE';
// export const TEACHER_INPUT_CHANGE = 'TEACHER_INPUT_CHANGE';

/* Lessons */
export const TEACHER_GET_LESSONS = 'TEACHER_GET_LESSONS';
export const TEACHER_GET_LESSONS_SUCCESS = 'TEACHER_GET_LESSONS_SUCCESS';
export const TEACHER_GET_LESSONS_ERROR = 'TEACHER_GET_LESSONS_ERROR';

export const TEACHER_GET_ATTENDANCES = 'TEACHER_GET_ATTENDANCES';
export const TEACHER_GET_ATTENDANCES_SUCCESS = 'TEACHER_GET_ATTENDANCES_SUCCESS';
export const TEACHER_GET_ATTENDANCES_ERROR = 'TEACHER_GET_ATTENDANCES_ERROR';

export const TEACHER_SET_ATTENDANCE = 'TEACHER_SET_ATTENDANCE';
export const TEACHER_SET_ATTENDANCE_SUCCESS = 'TEACHER_SET_ATTENDANCE_SUCCESS';
export const TEACHER_SET_ATTENDANCE_ERROR = 'TEACHER_SET_ATTENDANCE_ERROR';

/* Calendar */
export const TEACHER_GET_CALENDAR = 'TEACHER_GET_CALENDAR';
export const TEACHER_GET_CALENDAR_SUCCESS = 'TEACHER_GET_CALENDAR_SUCCESS';
export const TEACHER_GET_CALENDAR_ERROR = 'TEACHER_GET_CALENDAR_ERROR';


export const teacherActions = {
    /* Profile and others */
    getMyselfData: () => ({type: GET_MYSELF_DATA}),
    getMyselfDataSuccess: (response) => ({type: GET_MYSELF_DATA_SUCCESS, response}),
    getMyselfDataError: (error) => ({type: GET_MYSELF_DATA_ERROR, error}),
    
    selectLesson: (lesson) => ({ type: TEACHER_SELECT_LESSON, lesson }),
    teacherChangeModalState: (modalState) => ({type: TEACHER_CHANGE_MODAL_STATE, modalState }),
    // teacherInputChange: () => ({type: TEACHER_INPUT_CHANGE}),

    /* Lessons */
    getLessons: () => ({type: TEACHER_GET_LESSONS }),
    getLessonsSuccess: (response) => ({type: TEACHER_GET_LESSONS_SUCCESS, response}),
    getLessonsError: () => ({type: TEACHER_GET_LESSONS_ERROR}),
    
    getAttendances: () => ({ type: TEACHER_GET_ATTENDANCES }),
    getAttendances: (response) => ({ type: TEACHER_GET_ATTENDANCES_SUCCESS, response }),
    getAttendances: () => ({ type: TEACHER_GET_ATTENDANCES_ERROR }),
    
    setAttendance: (attendance) => ({ type: TEACHER_SET_ATTENDANCE, attendance }),
    setAttendance: () => ({ type: TEACHER_SET_ATTENDANCE_SUCCESS }),
    setAttendance: () => ({ type: TEACHER_SET_ATTENDANCE_ERROR }),
    
    /* Calendar */
    getCalendar: (startDate, endDate) => ({type: TEACHER_GET_CALENDAR, startDate, endDate }),
    getCalendarSuccess: (response) => ({type: TEACHER_GET_CALENDAR_SUCCESS, response}),
    getCalendarError: () => ({type: TEACHER_GET_CALENDAR_ERROR}),
};

export default teacherActions;