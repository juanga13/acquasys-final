import teacherActions, {
    TEACHER_GET_LESSONS,
    TEACHER_GET_ATTENDANCES,
    TEACHER_SET_ATTENDANCE,
    TEACHER_GET_MYSELF_DATA,
} from './teacher.actions';
import requests from './teacher.services';
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

        case TEACHER_GET_ATTENDANCES:
            requests.getAttenances()
                .then((response) => {
                    dispatch(teacherActions.getAttenancesSuccess(response))
                })
                .catch((error) => {
                    dispatch(teacherActions.getAttenancesError());
                    fireToast( I18n.t('teacher.lessons.error.getAttendances.title'), I18n.t('teacher.lessons.error.getAttendances.description'), 'error', 'warning' );
                })
            break;

        case TEACHER_SET_ATTENDANCE:
            requests.setAttendance(action.attendance)
                .then((response) => {
                    dispatch(teacherActions.setAttendanceSuccess());
                    dispatch(teacherActions.getAttendances(getState().teacher.selectedLesson.id));
                })
                .catch((error) => {
                    dispatch(teacherActions.setAttendanceError());
                    fireToast( I18n.t('teacher.lessons.error.setAttendance.title'), I18n.t('teacher.lessons.error.setAttendance.description'), 'error', 'warning' );
                })
            break;

        case TEACHER_GET_MYSELF_DATA:
            requests.getMyselfData()
                .then((response) => dispatch(teacherActions.getMyselfDataSuccess(response)))
                .catch(() => {
                    dispatch(teacherActions.getMyselfDataError());
                    fireToast( I18n.t('teacher.lessons.error.getMyself.title'), I18n.t('teacher.lessons.error.getMyself.description'), 'error', 'warning' );
                })
            break;

        default: break;
    }
};

export default teacherMiddleware;