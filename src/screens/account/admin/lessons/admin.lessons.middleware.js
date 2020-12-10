import adminLessonsActions, { 
    ADMIN_GET_LESSONS, 
    CREATE_LESSON, 
    ADMIN_LESSONS_CHANGE_MODAL_STATE, 
    DELETE_LESSON,
    UPDATE_LESSON,
    ADMIN_GET_ATTENDANCES,
    ADMIN_SET_ATTENDANCE,
    ADMIN_SELECT_LESSON,
} from './admin.lessons.actions';
import requests from './admin.lessons.services';
import { MODAL_STATES } from '../../../../utils/consts';
import { formToDataTransform } from '../../../../utils/dataFormTransform';
import { I18n } from 'react-redux-i18n';
import fireToast from '../../../common/components/Toaster';


const adminLessonsMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);
    switch (action.type) {
        case ADMIN_GET_LESSONS:
            requests.getLessons()
                .then(response => dispatch(adminLessonsActions.getLessonsSuccess(response)))
                .catch(() => {
                    fireToast( I18n.t('admin.lessons.error.get.title'), I18n.t('admin.lessons.error.get.description'), 'error', 'warning' );
                    dispatch(adminLessonsActions.getLessonsError())
                });
            break;

        case ADMIN_LESSONS_CHANGE_MODAL_STATE:
            action.modalState === MODAL_STATES.CLOSED && dispatch(adminLessonsActions.selectLesson(null))
            break;

        case CREATE_LESSON:
            const createLessonForm = getState().admin.lessons.lessonForm;
            let createData = formToDataTransform(createLessonForm);
            // take missing data (not shown in form) and add it in order to make the request
            // take data from getState().selectedLesson and insert it into data!
            createData.id = 0;
            // if (createData.password.value === '') {
            //     createData.password.value = 'asd123';
            // }
            requests.createLesson(createData)
                .then(() => {
                    dispatch(adminLessonsActions.createLessonSuccess());
                    fireToast( I18n.t('admin.lessons.success.create.title'), I18n.t('admin.lessons.success.create.description'),'success', 'check' );
                    dispatch(adminLessonsActions.getLessons());
                    dispatch(adminLessonsActions.adminLessonsChangeModalState(MODAL_STATES.CLOSED));
                })
                .catch(() => {
                    fireToast( I18n.t('admin.lessons.error.create.title'), I18n.t('admin.lessons.error.create.description'), 'error', 'warning' );
                    dispatch(adminLessonsActions.createLessonError())
                });
            break;

        case UPDATE_LESSON:
            const updateSelectedLesson = getState().admin.lessons.selectedLesson;
            let updateData = formToDataTransform(getState().admin.lessons.lessonForm);
            // take missing data (not shown in form) and add it in order to make the request
            // take data from getState().selectedLesson and insert it into data!
            updateData.id = updateSelectedLesson.id;
            updateData.role = updateSelectedLesson.role;
            if (updateData.password === '') {
                updateData.password = updateSelectedLesson.password;
            }
            requests.updateLesson(updateData)
                .then(() => {
                    dispatch(adminLessonsActions.updateLessonSuccess());
                    fireToast( I18n.t('admin.lessons.success.update.title'), I18n.t('admin.lessons.success.update.description'), 'success', 'check' );
                    dispatch(adminLessonsActions.getLessons());
                    dispatch(adminLessonsActions.adminLessonsChangeModalState(MODAL_STATES.CLOSED));
                })
                .catch(() => {
                    fireToast( I18n.t('admin.lessons.error.update.title'), I18n.t('admin.lessons.error.update.description'), 'error', 'warning' );
                    dispatch(adminLessonsActions.updateLessonError())
                });
            break;

        case DELETE_LESSON:
            requests.deleteLesson(action.id)
                .then(() => {
                    dispatch(adminLessonsActions.deleteLessonSuccess());
                    fireToast( I18n.t('admin.lessons.success.delete.title'), I18n.t('admin.lessons.success.delete.description'), 'success', 'check' );
                    dispatch(adminLessonsActions.selectLesson(null));
                    dispatch(adminLessonsActions.getLessons());
                    dispatch(adminLessonsActions.adminLessonsChangeModalState(MODAL_STATES.CLOSED));
                })
                .catch(() => {
                    fireToast( I18n.t('admin.lessons.error.delete.title'), I18n.t('admin.lessons.error.delete.description'), 'error', 'warning' );
                    dispatch(adminLessonsActions.deleteLessonError())
                });
            break;

        case ADMIN_SELECT_LESSON:
            dispatch(adminLessonsActions.getAttendance(action.lesson.id));
            break;

        case ADMIN_GET_ATTENDANCES:
            requests.getAttendances(action.id)
                .then((response) => {
                    dispatch(adminLessonsActions.getAttendancesSuccess(response));
                })
                .catch((error) => {
                    dispatch(adminLessonsActions.getAttendancesError());
                    fireToast(I18n.t('admin.lessons.error.getAttendance.title'), I18n.t('admin.lessons.error.getAttendance.description'), 'error', 'warning');
                });
            break;

        case ADMIN_SET_ATTENDANCE:
            requests.setAttendance(action.attendance)
                .then((response) => {
                    dispatch(adminLessonsActions.setAttendanceSuccess());
                    dispatch(adminLessonsActions.getAttendance(getState().selectedLesson.id))
                })
                .catch((error) => {
                    dispatch(adminLessonsActions.setAttendanceError());
                    fireToast(I18n.t('admin.lessons.error.setAttendance.title'), I18n.t('admin.lessons.error.setAttendance.title'), 'error', 'warning');
                });
            break;

        default: break;
    }
};

export default adminLessonsMiddleware;