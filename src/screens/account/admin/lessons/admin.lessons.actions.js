export const GET_LESSONS = 'GET_LESSONS';
export const GET_LESSONS_SUCCESS = 'GET_LESSONS_SUCCESS';
export const GET_LESSONS_ERROR = 'GET_LESSONS_ERROR';

export const ADMIN_LESSONS_INPUT_CHANGE = 'ADMIN_LESSONS_INPUT_CHANGE';
export const ADMIN_LESSONS_CHANGE_MODAL_STATE = 'ADMIN_LESSONS_CHANGE_MODAL_STATE';
export const SELECT_LESSON = 'SELECT_LESSON';

export const CREATE_LESSON = 'CREATE_LESSON';
export const CREATE_LESSON_SUCCESS = 'CREATE_LESSON_SUCCESS';
export const CREATE_LESSON_ERROR = 'CREATE_LESSON_ERROR';

export const UPDATE_LESSON = 'UPDATE_LESSON';
export const UPDATE_LESSON_SUCCESS = 'UPDATE_LESSON_SUCCESS';
export const UPDATE_LESSON_ERROR = 'UPDATE_LESSON_ERROR';

export const DELETE_LESSON = 'DELETE_LESSON';
export const DELETE_LESSON_SUCCESS = 'DELETE_LESSON_SUCCESS';
export const DELETE_LESSON_ERROR = 'DELETE_LESSON_ERROR';


const adminLessonsActions = {
    getLessons: () => ({ type: GET_LESSONS }),
    getLessonsSuccess: (response) => ({ type: GET_LESSONS_SUCCESS, response }),
    getLessonsError: () => ({ type: GET_LESSONS_ERROR }),

    adminLessonsInputChange: (id, value) => ({ type: ADMIN_LESSONS_INPUT_CHANGE, id, value }),
    adminLessonsChangeModalState: (modalState) => ({ type: ADMIN_LESSONS_CHANGE_MODAL_STATE, modalState }),
    selectLesson: (lesson) => ({ type: SELECT_LESSON, lesson }),

    createLesson: (data) => ({ type: CREATE_LESSON, data }),
    createLessonSuccess: () => ({ type: CREATE_LESSON_SUCCESS }),
    createLessonError: () => ({ type: CREATE_LESSON_ERROR }),

    updateLesson: (data) => ({ type: UPDATE_LESSON, data }),
    updateLessonSuccess: () => ({ type: UPDATE_LESSON_SUCCESS }),
    updateLessonError: () => ({ type: UPDATE_LESSON_ERROR }),

    deleteLesson: (id) => ({ type: DELETE_LESSON, id }),
    deleteLessonSuccess: () => ({ type: DELETE_LESSON_SUCCESS }),
    deleteLessonError: () => ({ type: DELETE_LESSON_ERROR })
};

export default adminLessonsActions;