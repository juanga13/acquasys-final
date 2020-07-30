import teacherActions, {
    TEACHER_GET_LESSONS,
    // TEACHER_GET_CALENDAR,
    TEACHER_GET_ATTENDANCES,
    TEACHER_SET_ATTENDANCE,
    TEACHER_CHANGE_MODAL_STATE
} from './teacher.actions';
import requests from './teacher.services';
import { MODAL_STATES } from '../../../utils/consts';

const teacherMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case TEACHER_GET_LESSONS:
            requests.getLessons()
                .then((response) => dispatch(teacherActions.getLessonsSuccess(response)))
                .catch(() => dispatch(teacherActions.getLessonsError()))
            break;

        // TODO no esta hecho en el back
        // case GET_CALENDAR:
        //     requests.getCalendar()
        //         .then(() => dispatch(teacherActions.getCalendarSuccess()))
        //         .catch(() => dispatch(teacherActions.getCalendarError()))
        //     break;

        case TEACHER_GET_ATTENDANCES:
            requests.getAttenances()
                .then(() => dispatch(teacherActions.getAttenancesSuccess()))
                .catch(() => dispatch(teacherActions.getAttenancesError()))
            break;

        case TEACHER_SET_ATTENDANCE:
            requests.setAttendance(action.attendance)
                .then(() => dispatch(teacherActions.setAttendanceSuccess()))
                .catch(() => dispatch(teacherActions.setAttendanceError()))
            break;

        case TEACHER_CHANGE_MODAL_STATE:
            action.modalState === MODAL_STATES.CLOSED && dispatch(teacherActions.selectLesson(null));
            break;
            

        default: break;
    }
};

export default teacherMiddleware;