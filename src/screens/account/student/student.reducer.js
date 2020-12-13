import {
    STUDENT_GET_LESSONS, STUDENT_GET_LESSONS_SUCCESS, STUDENT_GET_LESSONS_ERROR,
    STUDENT_GET_PAYMENTS, STUDENT_GET_PAYMENTS_SUCCESS, STUDENT_GET_PAYMENTS_ERROR,
    STUDENT_GET_CALENDAR, STUDENT_GET_CALENDAR_SUCCESS, STUDENT_GET_CALENDAR_ERROR,
    SUBSCRIBE_LESSON, SUBSCRIBE_LESSON_SUCCESS, SUBSCRIBE_LESSON_ERROR,
    UNSUBSCRIBE_LESSON, UNSUBSCRIBE_LESSON_SUCCESS, UNSUBSCRIBE_LESSON_ERROR,
    STUDENT_CHANGE_MODAL_STATE,
    STUDENT_INPUT_CHANGE,
    GET_MY_ENROLLED, GET_MY_ENROLLED_SUCCESS, GET_MY_ENROLLED_ERROR,
    GET_MYSELF_DATA, GET_MYSELF_DATA_SUCCESS, GET_MYSELF_DATA_ERROR, STUDENT_SELECT_PAYMENT, STUDENT_LESSONS_CHANGE_MODAL_STATE, STUDENT_SELECT_LESSON,
    // UPDATE_MY_DATA_REQUEST, UPDATE_MY_DATA_REQUEST_SUCCESS, UPDATE_MY_DATA_REQUEST_ERROR,
} from './student.actions';
import { REQUEST_STATUS, MODAL_STATES } from '../../../utils/consts';
import verifyInput from '../../../utils/verifyInput';
import { dataToFormTransform } from '../../../utils/dataFormTransform';

// const _today = new Date();
const initialState = {
    /* profile and other */
    modalState: MODAL_STATES.CLOSED,
    myEnrolled: [],
    getMyEnrolledStatus: REQUEST_STATUS.NONE,
    myData: null,
    getMyselfDataStatus: REQUEST_STATUS.NONE,

    /* calendar */
    calendar: null,
    getCalendarStatus: REQUEST_STATUS.NONE,
    
    /* lessons */
    lessons: [],
    getLessonsStatus: REQUEST_STATUS.NONE,
    selectedLesson: null,
    subscribeLessonStatus: REQUEST_STATUS.NONE,
    unsubscribeLessonStatus: REQUEST_STATUS.NONE,
    attendances: [],
    getAttendancesStatus: REQUEST_STATUS.NONE,
    setAttendanceStatus: REQUEST_STATUS.NONE,
    
    /* payment */
    payments: [],
    getPaymentsStatus: REQUEST_STATUS.NONE,
    selectedPayment: null,
    
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        /* profile and other */
        case STUDENT_CHANGE_MODAL_STATE: 
            if (action.modalState === MODAL_STATES.EDIT) {
                const newStudentForm = dataToFormTransform(state.myData, state.form);
                return { ...state, modalState: action.modalState, form: newStudentForm };    
            } else {
                // preview utiliza selectedStudent solo, delete utiliza data solo y create utiliza el form solo
                return { ...state, modalState: action.modalState, form: initialState.form };
            };
            
        case STUDENT_INPUT_CHANGE: 
            const { id, typedD, value } = action;
            const error = !verifyInput(id, typedD, value);
            return {
                ...state,
                studentForm: {
                    ...state.studentForm,
                    [id]: {
                        ...state.studentForm[id],
                        value,
                        error
                    }
                }
            };

        case GET_MY_ENROLLED: return { ...state, getMyEnrolledStatus: REQUEST_STATUS.LOADING };
        case GET_MY_ENROLLED_SUCCESS: return { ...state, getMyEnrolledStatus: REQUEST_STATUS.SUCCESS, myEnrolled: action.response };
        case GET_MY_ENROLLED_ERROR: return { ...state, getMyEnrolledStatus: REQUEST_STATUS.ERROR };

        case GET_MYSELF_DATA: return { ...state, getMyselfDataStatus: REQUEST_STATUS.LOADING };
        case GET_MYSELF_DATA_SUCCESS: return { ...state, getMyselfDataStatus: REQUEST_STATUS.SUCCESS, myData: action.response };
        case GET_MYSELF_DATA_ERROR: return { ...state, getMyselfDataStatus: REQUEST_STATUS.ERROR };

        // case UPDATE_MY_DATA_REQUEST: return { ...state, updateMyDataStatus: REQUEST_STATUS.LOADING };
        // case UPDATE_MY_DATA_REQUEST_SUCCESS: return { ...state, updateMyDataStatus: REQUEST_STATUS.SUCCESS };
        // case UPDATE_MY_DATA_REQUEST_ERROR: return { ...state, updateMyDataStatus: REQUEST_STATUS.ERROR };
        
        /* calendar */
        case STUDENT_GET_CALENDAR: return { ...state, getCalendarStatus: REQUEST_STATUS.LOADING };
        case STUDENT_GET_CALENDAR_SUCCESS: return { ...state, getCalendarStatus: REQUEST_STATUS.SUCCESS, calendar: action.response };
        case STUDENT_GET_CALENDAR_ERROR: return { ...state, getCalendarStatus: REQUEST_STATUS.ERROR };

        /* lessons */
        case STUDENT_LESSONS_CHANGE_MODAL_STATE: return { ...state, modalState: action.modalState };
        case STUDENT_SELECT_LESSON: return { ...state, selectedLesson: action.lesson };

        case STUDENT_GET_LESSONS: return { ...state, getLessonsStatus: REQUEST_STATUS.LOADING };
        case STUDENT_GET_LESSONS_SUCCESS: return { ...state, getLessonsStatus: REQUEST_STATUS.SUCCESS, lessons: action.response };
        case STUDENT_GET_LESSONS_ERROR: return { ...state, getLessonsStatus: REQUEST_STATUS.ERROR };
        
        case SUBSCRIBE_LESSON: return { ...state, subscribeLessonStatus: REQUEST_STATUS.LOADING };
        case SUBSCRIBE_LESSON_SUCCESS: return { ...state, subscribeLessonStatus: REQUEST_STATUS.SUCCESS };
        case SUBSCRIBE_LESSON_ERROR: return { ...state, subscribeLessonStatus: REQUEST_STATUS.ERROR };

        case UNSUBSCRIBE_LESSON: return { ...state, unsubscribeLessonStatus: REQUEST_STATUS.LOADING };
        case UNSUBSCRIBE_LESSON_SUCCESS: return { ...state, unsubscribeLessonStatus: REQUEST_STATUS.SUCCESS };
        case UNSUBSCRIBE_LESSON_ERROR: return { ...state, unsubscribeLessonStatus: REQUEST_STATUS.ERROR };

        /* payment */
        case STUDENT_GET_PAYMENTS: return { ...state, getPaymentsStatus: REQUEST_STATUS.LOADING };
        case STUDENT_GET_PAYMENTS_SUCCESS: return { ...state, getPaymentsStatus: REQUEST_STATUS.SUCCESS, payments: action.response };
        case STUDENT_GET_PAYMENTS_ERROR: return { ...state, getPaymentsStatus: REQUEST_STATUS.ERROR };

        case STUDENT_SELECT_PAYMENT: return { ...state, selectedPayment: action.payment };


        default: return state;
    }
};

export default studentReducer;