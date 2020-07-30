import {
    ADMIN_GET_CALENDAR, ADMIN_GET_CALENDAR_RESPONSE, ADMIN_GET_CALENDAR_ERROR
} from './admin.calendar.actions';
import { REQUEST_STATUS, MODAL_STATES } from '../../../../utils/consts';
import { LOGOUT } from '../../../session/session.actions';


const initialState = {
    calendar: [],
    getCalendarStatus: REQUEST_STATUS.NONE
};

const adminCalendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_GET_CALENDAR: return { ...state, getCalendarStatus: REQUEST_STATUS.LOADING };
        case ADMIN_GET_CALENDAR_RESPONSE: return { ...state, getCalendarStatus: REQUEST_STATUS.SUCCESS, calendar: action.response };
        case ADMIN_GET_CALENDAR_ERROR: return { ...state, getCalendarStatus: REQUEST_STATUS.ERROR };

        case LOGOUT: return initialState;


        default: return state;
    }
};

export default adminCalendarReducer;