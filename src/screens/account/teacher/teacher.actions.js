export const TEACHER_GET_LESSONS = 'TEACHER_GET_LESSONS';
export const TEACHER_GET_LESSONS_SUCCESS = 'TEACHER_GET_LESSONS_SUCCESS';
export const TEACHER_GET_LESSONS_ERROR = 'TEACHER_GET_LESSONS_ERROR';

// TODO no esta hecho en el back
// export const GET_CALENDAR = 'GET_CALENDAR';
// export const GET_CALENDAR_SUCCESS = 'GET_CALENDAR_SUCCESS';
// export const GET_CALENDAR_ERROR = 'GET_CALENDAR_ERROR';

export const TEACHER_GET_ATTENDANCES = 'TEACHER_GET_ATTENDANCES';
export const TEACHER_GET_ATTENDANCES_SUCCESS = 'TEACHER_GET_ATTENDANCES_SUCCESS';
export const TEACHER_GET_ATTENDANCES_ERROR = 'TEACHER_GET_ATTENDANCES_ERROR';

export const TEACHER_SET_ATTENDANCE = 'TEACHER_SET_ATTENDANCE';
export const TEACHER_SET_ATTENDANCE_SUCCESS = 'TEACHER_SET_ATTENDANCE_SUCCESS';
export const TEACHER_SET_ATTENDANCE_ERROR = 'TEACHER_SET_ATTENDANCE_ERROR';

export const TEACHER_SELECT_LESSON = 'SELECT_LESSON';
export const TEACHER_CHANGE_MODAL_STATE = 'TEACHER_CHANGE_MODAL_STATE';
// export const TEACHER_INPUT_CHANGE = 'TEACHER_INPUT_CHANGE';


const teacherActions = {
    getLessons: () => ({type: TEACHER_GET_LESSONS }),
    getLessonsSuccess: (response) => ({type: TEACHER_GET_LESSONS_SUCCESS, response}),
    getLessonsError: () => ({type: TEACHER_GET_LESSONS_ERROR}),

    // TODO no esta hecho en el back
    // getCalendar: (startDate, endDate) => ({type: GET_CALENDAR, startDate, endDate }),
    // getCalendarSuccess: (response) => ({type: GET_CALENDAR_SUCCESS, response}),
    // getCalendarError: () => ({type: GET_CALENDAR_ERROR}),

    getAttendances: () => ({ type: TEACHER_GET_ATTENDANCES }),
    getAttendances: (response) => ({ type: TEACHER_GET_ATTENDANCES_SUCCESS, response }),
    getAttendances: () => ({ type: TEACHER_GET_ATTENDANCES_ERROR }),

    setAttendance: (attendance) => ({ type: TEACHER_SET_ATTENDANCE, attendance }),
    setAttendance: () => ({ type: TEACHER_SET_ATTENDANCE_SUCCESS }),
    setAttendance: () => ({ type: TEACHER_SET_ATTENDANCE_ERROR }),
    
    selectLesson: (lesson) => ({ type: TEACHER_SELECT_LESSON, lesson }),
    teacherChangeModalState: (modalState) => ({type: TEACHER_CHANGE_MODAL_STATE, modalState }),
    // teacherInputChange: () => ({type: TEACHER_INPUT_CHANGE}),
};

export default teacherActions;