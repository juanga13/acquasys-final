import {
    TEACHER_GET_LESSONS, TEACHER_GET_LESSONS_SUCCESS, TEACHER_GET_LESSONS_ERROR,
    TEACHER_GET_ATTENDANCES, TEACHER_GET_ATTENDANCES_SUCCESS, TEACHER_GET_ATTENDANCES_ERROR,
    TEACHER_SET_ATTENDANCE, TEACHER_SET_ATTENDANCE_SUCCESS, TEACHER_SET_ATTENDANCE_ERROR,
    TEACHER_SELECT_LESSON,
    TEACHER_CHANGE_MODAL_STATE,
    TEACHER_GET_CALENDAR, TEACHER_GET_CALENDAR_SUCCESS, TEACHER_GET_CALENDAR_ERROR,
    GET_MYSELF_DATA, GET_MYSELF_DATA_SUCCESS, GET_MYSELF_DATA_ERROR
} from './teacher.actions';
import { REQUEST_STATUS, MODAL_STATES } from '../../../utils/consts';

const initialState = {
    /* profile and other */
    modalState: MODAL_STATES.CLOSED,
    myData: null,
    getMyselfDataStatus: REQUEST_STATUS.NONE,
    selectedLesson: null,
    
    /* calendar */
    calendar: null,
    getCalendarStatus: REQUEST_STATUS.NONE,
    
    /* lessons */
    lessons: [],
    getLessonsStatus: REQUEST_STATUS.NONE,
    attendances: [],
    getAttendancesStatus: REQUEST_STATUS.NONE,
    setAttendanceStatus: REQUEST_STATUS.NONE,
};

const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        /* profile and other */
        case GET_MYSELF_DATA: return { ...state, getMyselfDataStatus: REQUEST_STATUS.LOADING };
        case GET_MYSELF_DATA_SUCCESS: return { ...state, getMyselfDataStatus: REQUEST_STATUS.SUCCESS, myData: action.response };
        case GET_MYSELF_DATA_ERROR: return { ...state, getMyselfDataStatus: REQUEST_STATUS.ERROR };
        
        case TEACHER_SELECT_LESSON: return { ...state, selectedLesson: action.lesson };
        case TEACHER_CHANGE_MODAL_STATE: return { ...state, modalState: action.modalState };

        /* lessons */
        case TEACHER_GET_LESSONS: return { ...state, getLessonsStatus: REQUEST_STATUS.LOADING };
        case TEACHER_GET_LESSONS_SUCCESS: return { ...state, getLessonsStatus: REQUEST_STATUS.SUCCESS, lessons: action.response };
        case TEACHER_GET_LESSONS_ERROR: return { ...state, getLessonsStatus: REQUEST_STATUS.ERROR };

        case TEACHER_GET_ATTENDANCES: return { ...state, getAttendancesStatus: REQUEST_STATUS.LOADING };
        case TEACHER_GET_ATTENDANCES_SUCCESS: return { ...state, getAttendancesStatus: REQUEST_STATUS.SUCCESS, attendances: action.response };
        case TEACHER_GET_ATTENDANCES_ERROR: return { ...state, getAttendancesStatus: REQUEST_STATUS.ERROR };

        case TEACHER_SET_ATTENDANCE: return { ...state, setAttendanceStatus: REQUEST_STATUS.LOADING };
        case TEACHER_SET_ATTENDANCE_SUCCESS: return { ...state, setAttendanceStatus: REQUEST_STATUS.SUCCESS };
        case TEACHER_SET_ATTENDANCE_ERROR: return { ...state, setAttendanceStatus: REQUEST_STATUS.ERROR };


        /* calendar */
        case TEACHER_GET_CALENDAR: return { ...state, getCalendarStatus: REQUEST_STATUS.LOADING };
        case TEACHER_GET_CALENDAR_SUCCESS: return { ...state, getCalendarStatus: REQUEST_STATUS.SUCCESS, calendar: action.response };
        case TEACHER_GET_CALENDAR_ERROR: return { ...state, getCalendarStatus: REQUEST_STATUS.ERROR };

        default: return state;
    }
};

export default teacherReducer;