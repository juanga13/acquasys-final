export const ADMIN_GET_LESSONS = 'ADMIN_GET_LESSONS';
export const ADMIN_GET_LESSONS_SUCCESS = 'ADMIN_GET_LESSONS_SUCCESS';
export const ADMIN_GET_LESSONS_ERROR = 'ADMIN_GET_LESSONS_ERROR';

export const ADMIN_LESSONS_INPUT_CHANGE = 'ADMIN_LESSONS_INPUT_CHANGE';
export const ADMIN_LESSONS_CHANGE_MODAL_STATE = 'ADMIN_LESSONS_CHANGE_MODAL_STATE';
export const ADMIN_SELECT_LESSON = 'ADMIN_SELECT_LESSON';

export const CREATE_LESSON = 'CREATE_LESSON';
export const CREATE_LESSON_SUCCESS = 'CREATE_LESSON_SUCCESS';
export const CREATE_LESSON_ERROR = 'CREATE_LESSON_ERROR';

export const UPDATE_LESSON = 'UPDATE_LESSON';
export const UPDATE_LESSON_SUCCESS = 'UPDATE_LESSON_SUCCESS';
export const UPDATE_LESSON_ERROR = 'UPDATE_LESSON_ERROR';

export const DELETE_LESSON = 'DELETE_LESSON';
export const DELETE_LESSON_SUCCESS = 'DELETE_LESSON_SUCCESS';
export const DELETE_LESSON_ERROR = 'DELETE_LESSON_ERROR';

export const ADMIN_GET_ATTENDANCES = 'ADMIN_GET_ATTENDANCES';
export const ADMIN_GET_ATTENDANCES_SUCCESS = 'ADMIN_GET_ATTENDANCES_SUCCESS';
export const ADMIN_GET_ATTENDANCES_ERROR = 'ADMIN_GET_ATTENDANCES_ERROR';

export const ADMIN_SET_ATTENDANCE = 'ADMIN_SET_ATTENDANCE';
export const ADMIN_SET_ATTENDANCE_SUCCESS = 'ADMIN_SET_ATTENDANCE_SUCCESS';
export const ADMIN_SET_ATTENDANCE_ERROR = 'ADMIN_SET_ATTENDANCE_ERROR';

export const CLEAR_STATUSES = 'CLEAR_STATUSES';


const adminLessonsActions = {
    getLessons: () => ({ type: ADMIN_GET_LESSONS }),
    getLessonsSuccess: (response) => ({ type: ADMIN_GET_LESSONS_SUCCESS, response }),
    getLessonsError: () => ({ type: ADMIN_GET_LESSONS_ERROR }),

    adminLessonsInputChange: (id, value) => ({ type: ADMIN_LESSONS_INPUT_CHANGE, id, value }),
    adminLessonsChangeModalState: (modalState) => ({ type: ADMIN_LESSONS_CHANGE_MODAL_STATE, modalState }),
    selectLesson: (lesson) => ({ type: ADMIN_SELECT_LESSON, lesson }),

    createLesson: (data) => ({ type: CREATE_LESSON, data }),
    createLessonSuccess: () => ({ type: CREATE_LESSON_SUCCESS }),
    createLessonError: () => ({ type: CREATE_LESSON_ERROR }),

    updateLesson: (data) => ({ type: UPDATE_LESSON, data }),
    updateLessonSuccess: () => ({ type: UPDATE_LESSON_SUCCESS }),
    updateLessonError: () => ({ type: UPDATE_LESSON_ERROR }),

    deleteLesson: (id) => ({ type: DELETE_LESSON, id }),
    deleteLessonSuccess: () => ({ type: DELETE_LESSON_SUCCESS }),
    deleteLessonError: () => ({ type: DELETE_LESSON_ERROR }),

    getAttendances: () => ({ type: ADMIN_GET_ATTENDANCES }),
    getAttendances: (response) => ({ type: ADMIN_GET_ATTENDANCES_SUCCESS, response }),
    getAttendances: () => ({ type: ADMIN_GET_ATTENDANCES_ERROR }),

    setAttendance: (attendance) => ({ type: ADMIN_SET_ATTENDANCE, attendance }),
    setAttendance: () => ({ type: ADMIN_SET_ATTENDANCE_SUCCESS }),
    setAttendance: () => ({ type: ADMIN_SET_ATTENDANCE_ERROR }),
    
    clearStatuses: () => ({ type: CLEAR_STATUSES })
};

export default adminLessonsActions;