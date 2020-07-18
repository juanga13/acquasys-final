import adminCalendarActions, {
    GET_CALENDAR
} from './admin.calendar.actions';
import requests from './admin.calendar.services';

const adminCalendarMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case GET_CALENDAR:
            requests.getCalendar(action.startDate, action.endDate)
                .then(response => dispatch(adminCalendarActions.getCalendarResponse(response)))
                .catch(() => dispatch(adminCalendarActions.getCalendarError()))
            break;


        default: break;
    }
};

export default adminCalendarMiddleware;