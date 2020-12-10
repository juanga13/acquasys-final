import teacherActions, {
    TEACHER_GET_LESSONS,
    TEACHER_GET_CALENDAR,
    TEACHER_GET_ATTENDANCES,
    TEACHER_SET_ATTENDANCE,
    TEACHER_CHANGE_MODAL_STATE
} from './teacher.actions';
import requests from './teacher.services';
import { MODAL_STATES } from '../../../utils/consts';
import { GET_MYSELF_DATA } from '../student/student.actions';
import fireToast from '../../common/components/Toaster';
import { I18n } from 'react-redux-i18n';


const teacherMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case TEACHER_GET_LESSONS:
            requests.getLessons()
                .then((response) => dispatch(teacherActions.getLessonsSuccess(response)))
                .catch(() => {
                    dispatch(teacherActions.getLessonsError());
                    fireToast( I18n.t('teacher.lessons.error.get.title'), I18n.t('teacher.lessons.error.get.description'), 'error', 'warning' );
                })
            break;

        case TEACHER_GET_CALENDAR:
            requests.getCalendar(action.startDate, action.endDate)
                .then(() => dispatch(teacherActions.getCalendarSuccess()))
                .catch(() => {
                    dispatch(teacherActions.getCalendarError());
                    fireToast( I18n.t('teacher.lessons.error.calendar.title'), I18n.t('teacher.lessons.error.calendar.description'), 'error', 'warning' );
                })
            break;

        case TEACHER_GET_ATTENDANCES:
            requests.getAttenances()
                .then(() => dispatch(teacherActions.getAttenancesSuccess()))
                .catch(() => {
                    dispatch(teacherActions.getAttenancesError());
                    fireToast( I18n.t('teacher.lessons.error.getAttendances.title'), I18n.t('teacher.lessons.error.getAttendances.description'), 'error', 'warning' );
                })
            break;

        case TEACHER_SET_ATTENDANCE:
            requests.setAttendance(action.attendance)
                .then(() => {
                    dispatch(teacherActions.setAttendanceSuccess());
                    fireToast( I18n.t('teacher.lessons.success.setAttendance.title'), I18n.t('teacher.lessons.success.setAttendance.description'), 'success', 'check' );
                })
                .catch(() => {
                    dispatch(teacherActions.setAttendanceError());
                    fireToast( I18n.t('teacher.lessons.error.setAttendance.title'), I18n.t('teacher.lessons.error.setAttendance.description'), 'error', 'warning' );
                })
            break;
                
        case GET_MYSELF_DATA:
            requests.getMyselfData()
            .then(() => dispatch(teacherActions.getMyselfDataSuccess()))
            .catch(() => {
                dispatch(teacherActions.getMyselfDataError());
                fireToast( I18n.t('teacher.lessons.error.getMyself.title'), I18n.t('teacher.lessons.error.getMyself.description'), 'error', 'warning' );
            })
            break;

        default: break;
    }
};

export default teacherMiddleware;