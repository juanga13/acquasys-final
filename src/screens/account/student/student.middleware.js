import { I18n } from 'react-redux-i18n';
import fireToast from '../../common/components/Toaster';
import studentActions, {
    STUDENT_GET_LESSONS, 
    STUDENT_GET_PAYMENTS, 
    STUDENT_GET_CALENDAR,
    SUBSCRIBE_LESSON,
    UNSUBSCRIBE_LESSON,
    GET_MY_ENROLLED,
    GET_MYSELF_DATA,
    UPDATE_MY_DATA_REQUEST
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
                .catch(() => {
                    fireToast(I18n.t('student.lessons.error.get.title'), I18n.t('student.lessons.error.get.description'), 'error', 'warning');
                    dispatch(studentActions.getPaymentsError())
                })
            break;

        case STUDENT_GET_CALENDAR:
            request.getCalendar(action.startDate, action.endDate)
                .then(response => dispatch(studentActions.getCalendarSuccess(response)))
                .catch(() => dispatch(studentActions.getCalendarError()))
            break;

        case SUBSCRIBE_LESSON:
            request.suscribe()
                .then((response) => {
                    dispatch(studentActions.subscribeLessonSuccess(response))
                    fireToast(I18n.t('student.lessons.success.suscribe.title'), I18n.t('student.lessons.success.suscribe.description'), 'success', 'check');
                })
                .catch((error) => {
                    dispatch(studentActions.subscribeLessonError(error))
                    fireToast(I18n.t('student.lessons.error.suscribe.title'), I18n.t('student.lessons.error.suscribe.title'), 'error', 'warning');
                });
            break;

        case UNSUBSCRIBE_LESSON:
            request.unsuscribe()
                .then((response) => {
                    dispatch(studentActions.unsubscribeLessonSuccess(response))
                    fireToast( I18n.t('student.lessons.success.unsuscribe.title'), I18n.t('student.lessons.success.unsuscribe.description'), 'success', 'check');
                })
                .catch((error) => {
                    dispatch(studentActions.unsubscribeLessonError(error))
                    fireToast( I18n.t('student.lessons.error.unsuscribe.title'), I18n.t('student.lessons.error.unsuscribe.description'), 'error', 'warning');
                });
            break;

        case GET_MY_ENROLLED:
            request.getMyEnrolled()
                .then((response) => {dispatch(studentActions.getMyEnrolledSuccess(response))})
                .catch((error) => {
                    fireToast(I18n.t('student.lessons.error.enrollData.title'), I18n.t('student.lessons.error.enrollData.description'), 'error', 'warning');
                    dispatch(studentActions.getMyEnrolledError(error))
                });
            break;

        case GET_MYSELF_DATA:
            request.getMyselfData()
                .then((response) => {dispatch(studentActions.getMyselfDataSuccess(response))})
                .catch((error) => {
                    fireToast(I18n.t('student.lessons.error.myData.title'), I18n.t('student.lessons.error.myData.description'), 'error', 'warning');
                    dispatch(studentActions.getMyselfDataError(error))
                });
            break;

        // case UPDATE_MY_DATA_REQUEST:
        //     const myData = getState().student.myData;
        //     request.updateMyData(myData)
        //         .then(() => {
        //             dispatch();
        //         })
        //         .catch(() => {
        //             dispatch();
        //         })

        default: break;
    }
};

export default studentMiddleware;