import {
    STUDENT_GET_LESSONS,
    STUDENT_GET_LESSONS_SUCCESS,
    STUDENT_GET_LESSONS_ERROR,
    STUDENT_GET_PAYMENTS,
    STUDENT_GET_PAYMENTS_SUCCESS,
    STUDENT_GET_PAYMENTS_ERROR,
    STUDENT_GET_CALENDAR,
    STUDENT_GET_CALENDAR_SUCCESS,
    STUDENT_GET_CALENDAR_ERROR,
    SUBSCRIBE_LESSON,
    SUBSCRIBE_LESSON_SUCCESS,
    SUBSCRIBE_LESSON_ERROR,
    UNSUBSCRIBE_LESSON,
    UNSUBSCRIBE_LESSON_SUCCESS,
    UNSUBSCRIBE_LESSON_ERROR,
    STUDENT_CHANGE_MODAL_STATE,
    // STUDENT_INPUT_CHANGE
} from './student.actions';
import { REQUEST_STATUS, MODAL_STATES } from '../../../utils/consts';

const initialState = {
    calendar: null,
    getCalendarStatus: REQUEST_STATUS.NONE,
    getPaymentsStatus: REQUEST_STATUS.NONE,
    getLessonsStatus: REQUEST_STATUS.NONE,
    modalState: MODAL_STATES.CLOSED,
    lessons: [],
    payments: [],
    subscribeLessonStatus: REQUEST_STATUS.NONE,
    unsubscribeLessonStatus: REQUEST_STATUS.NONE,
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case STUDENT_GET_LESSONS: return { ...state, getLessonsStatus: REQUEST_STATUS.LOADING };
        case STUDENT_GET_LESSONS_SUCCESS:
            console.log('student'); 
            return { ...state, getLessonsStatus: REQUEST_STATUS.SUCCESS, lessons: action.response };
        case STUDENT_GET_LESSONS_ERROR: return { ...state, getLessonsStatus: REQUEST_STATUS.ERROR };

        case STUDENT_GET_PAYMENTS: return { ...state, getPaymentsStatus: REQUEST_STATUS.LOADING };
        case STUDENT_GET_PAYMENTS_SUCCESS: return { ...state, getPaymentsStatus: REQUEST_STATUS.SUCCESS, payments: action.response };
        case STUDENT_GET_PAYMENTS_ERROR: return { ...state, getPaymentsStatus: REQUEST_STATUS.ERROR };

        case STUDENT_GET_CALENDAR: return { ...state, getCalendarStatus: REQUEST_STATUS.LOADING };
        case STUDENT_GET_CALENDAR_SUCCESS: return { ...state, getCalendarStatus: REQUEST_STATUS.SUCCESS, calendar: action.response };
        case STUDENT_GET_CALENDAR_ERROR: return { ...state, getCalendarStatus: REQUEST_STATUS.ERROR };

        case SUBSCRIBE_LESSON: return { ...state, subscribeLessonStatus: REQUEST_STATUS.LOADING };
        case SUBSCRIBE_LESSON_SUCCESS: return { ...state, subscribeLessonStatus: REQUEST_STATUS.SUCCESS };
        case SUBSCRIBE_LESSON_ERROR: return { ...state, subscribeLessonStatus: REQUEST_STATUS.ERROR };

        case UNSUBSCRIBE_LESSON: return { ...state, unsubscribeLessonStatus: REQUEST_STATUS.LOADING };
        case UNSUBSCRIBE_LESSON_SUCCESS: return { ...state, unsubscribeLessonStatus: REQUEST_STATUS.SUCCESS };
        case UNSUBSCRIBE_LESSON_ERROR: return { ...state, unsubscribeLessonStatus: REQUEST_STATUS.ERROR };

        case STUDENT_CHANGE_MODAL_STATE: return { ...state, modalState: action.modalState };
        // case STUDENT_INPUT_CHANGE: 
        //     const { id, value } = action;
        //     return {
        //         ...state,
        //         studentForm: {
        //             ...state.studentForm,
        //             [id]: {
        //                 ...state.studentForm[id],
        //                 value
        //             }
        //         }
        //     };

        default: return state;
    }
};

export default studentReducer;