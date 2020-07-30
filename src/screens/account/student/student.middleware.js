import studentActions, {
    STUDENT_GET_LESSONS, 
    STUDENT_GET_PAYMENTS, 
    STUDENT_GET_CALENDAR,
    SUBSCRIBE_LESSON,
    UNSUBSCRIBE_LESSON
} from './student.actions';
import request from './student.services';

const studentMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case STUDENT_GET_LESSONS:
            request.getLessons()
                .then(response => dispatch(studentActions.getLessonsSuccess(response)))
                .catch(() => dispatch(studentActions.getLessonsError()))
            break;

        case STUDENT_GET_PAYMENTS:
            request.getPayments()
                .then(response => dispatch(studentActions.getPaymentsSuccess(response)))
                .catch(() => dispatch(studentActions.getPaymentsError()))
            break;

        case STUDENT_GET_CALENDAR:
            request.getCalendar()
                .then(response => dispatch(studentActions.getCalendarSuccess(response)))
                .catch(() => dispatch(studentActions.getCalendarError()))
            break;

        case SUBSCRIBE_LESSON:
            // TODO
            break;

        case UNSUBSCRIBE_LESSON:
            // TODO
            break;


        default: break;
    }
};

export default studentMiddleware;