import {
    ADMIN_GET_LESSONS, ADMIN_GET_LESSONS_SUCCESS, ADMIN_GET_LESSONS_ERROR,
    ADMIN_LESSONS_INPUT_CHANGE,
    ADMIN_LESSONS_CHANGE_MODAL_STATE,
    ADMIN_SELECT_LESSON,
    CREATE_LESSON, CREATE_LESSON_SUCCESS, CREATE_LESSON_ERROR,
    UPDATE_LESSON, UPDATE_LESSON_SUCCESS, UPDATE_LESSON_ERROR,
    DELETE_LESSON, DELETE_LESSON_SUCCESS, DELETE_LESSON_ERROR,
    ADMIN_GET_ATTENDANCES, ADMIN_GET_ATTENDANCES_SUCCESS, ADMIN_GET_ATTENDANCES_ERROR,
    ADMIN_SET_ATTENDANCE, ADMIN_SET_ATTENDANCE_SUCCESS, ADMIN_SET_ATTENDANCE_ERROR
} from './admin.lessons.actions';
import { REQUEST_STATUS, FIELD_TYPES, MODAL_STATES } from '../../../../utils/consts';
import { dataToFormTransform } from '../../../../utils/dataFormTransform';
import { LOGOUT } from '../../../session/session.actions';

const initialState = {
    lessons: [],
    selectedLesson: null,
    modalState: MODAL_STATES.CLOSED,
    getLessonsStatus: REQUEST_STATUS.NONE,
    createLessonStatus: REQUEST_STATUS.NONE,
    updateLessonStatus: REQUEST_STATUS.NONE,
    deleteLessonStatus: REQUEST_STATUS.NONE,
    lessonForm: {
        name: {id: 'name', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.name', label: 'forms.name', required: false },
        endDate: {id: 'endDate', value: new Date().getTime(), error: false, type: FIELD_TYPES.DATE, placeholder: 'forms.endDate', label: 'forms.endDate', required: false },
        startDate: {id: 'startDate', value: new Date().getTime(), error: false, type: FIELD_TYPES.DATE, placeholder: 'forms.startDate', label: 'forms.startDate', required: false },
        students: {id: 'students', value: [], error: false, type: FIELD_TYPES.NULL, placeholder: 'forms.students', label: 'forms.students', required: false },
        teachers: {id: 'teachers', value: [], error: false, type: FIELD_TYPES.NULL, placeholder: 'forms.teachers', label: 'forms.teachers', required: false },
        weekdays: {id: 'weekdays', value: [], error: false, type: FIELD_TYPES.NULL, placeholder: 'forms.weekdays', label: 'forms.weekdays', required: false }
        // id: {id: 'id', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.id', label: 'forms.id', required: false },
    },
    getAttendancesStatus: REQUEST_STATUS.NONE,
    attendances: [],
    setAttendanceStatus: REQUEST_STATUS.NONE
};

const adminLessonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_GET_LESSONS: return { ...state, getLessonsStatus: REQUEST_STATUS.LOADING };
        case ADMIN_GET_LESSONS_SUCCESS: return { ...state, getLessonsStatus: REQUEST_STATUS.SUCCESS, lessons: action.response };
        case ADMIN_GET_LESSONS_ERROR: return { ...state, getLessonsStatus: REQUEST_STATUS.ERROR };

        case ADMIN_LESSONS_INPUT_CHANGE: 
            const { id, value } = action;
                return {
                    ...state,
                    lessonForm: {
                        ...state.lessonForm,
                        [id]: {
                            ...state.lessonForm[id],
                            value
                        }
                    }
                };

        case ADMIN_LESSONS_CHANGE_MODAL_STATE: 
            // si pasa a edicion poblar el form con los datos del selectedLesson
            if (action.modalState === MODAL_STATES.EDIT) {
                const newLessonForm = dataToFormTransform(state.selectedLesson, state.lessonForm);
                return { ...state, modalState: action.modalState, lessonForm: newLessonForm };
            }
            // preview utiliza selectedLesson solo, delete utiliza data solo y create utiliza el form solo
            return { ...state, modalState: action.modalState, lessonForm: initialState.lessonForm };

        case ADMIN_SELECT_LESSON:  return { ...state, selectedLesson: action.lesson };

        case CREATE_LESSON: return { ...state, createLessonStatus: REQUEST_STATUS.LOADING };
        case CREATE_LESSON_SUCCESS: return { ...state, createLessonStatus: REQUEST_STATUS.SUCCESS };
        case CREATE_LESSON_ERROR: return { ...state, createLessonStatus: REQUEST_STATUS.ERROR };

        case UPDATE_LESSON: return { ...state, updateLessonStatus: REQUEST_STATUS.LOADING };
        case UPDATE_LESSON_SUCCESS: return { ...state, updateLessonStatus: REQUEST_STATUS.SUCCESS };
        case UPDATE_LESSON_ERROR: return { ...state, updateLessonStatus: REQUEST_STATUS.ERROR };

        case DELETE_LESSON: return { ...state, deleteLessonStatus: REQUEST_STATUS.LOADING };
        case DELETE_LESSON_SUCCESS: return { ...state, deleteLessonStatus: REQUEST_STATUS.SUCCESS };
        case DELETE_LESSON_ERROR: return { ...state, deleteLessonStatus: REQUEST_STATUS.ERROR };
        
        case ADMIN_GET_ATTENDANCES: return { ...state, getAttendancesStatus: REQUEST_STATUS.LOADING }
        case ADMIN_GET_ATTENDANCES_SUCCESS: return { ...state, getAttendancesStatus: REQUEST_STATUS.SUCCESS, attendances: action.response }
        case ADMIN_GET_ATTENDANCES_ERROR: return { ...state, getAttendancesStatus: REQUEST_STATUS.ERROR }

        case ADMIN_SET_ATTENDANCE: return { ...state, setAttendanceStatus: REQUEST_STATUS.LOADING }
        case ADMIN_SET_ATTENDANCE_SUCCESS: return { ...state, setAttendanceStatus: REQUEST_STATUS.SUCCESS }
        case ADMIN_SET_ATTENDANCE_ERROR: return { ...state, setAttendanceStatus: REQUEST_STATUS.ERROR }

        case LOGOUT: return initialState;


        default: return state;
    }
};

export default adminLessonsReducer;