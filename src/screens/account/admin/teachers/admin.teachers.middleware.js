import {
    GET_TEACHERS,
    ADMIN_TEACHERS_CHANGE_MODAL_STATE,
    CREATE_TEACHER,
    UPDATE_TEACHER,
    DELETE_TEACHER
} from './admin.teachers.actions';
import adminTeachersActions from './admin.teachers.actions';
import requests from './admin.teachers.services';
import { MODAL_STATES } from '../../../../utils/consts';
import { formToDataTransform } from '../../../../utils/dataFormTransform';
import fireToast from '../../../common/components/Toaster';
import { I18n } from 'react-redux-i18n';

const adminTeachersMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);
    switch (action.type) {
            case GET_TEACHERS:
                requests.getTeachers()
                    .then(response => dispatch(adminTeachersActions.getTeachersSuccess(response)))
                    .catch(() => dispatch(adminTeachersActions.getTeachersError()));
                break;

            case ADMIN_TEACHERS_CHANGE_MODAL_STATE:
                action.modalState === MODAL_STATES.CLOSED && dispatch(adminTeachersActions.selectTeacher(null))
                break;
                
            case CREATE_TEACHER:
                const createTeacherForm = getState().admin.teachers.teacherForm;
                let createData = formToDataTransform(createTeacherForm);
                // take missing data (not shown in form) and add it in order to make the request
                // take data from getState().selectedTeacher and insert it into data!
                createData.avatarUrl = '';
                createData.id = 0;
                createData.role = 'TEACHER';
                if (createData.password.value === '') {
                    createData.password.value = 'asd123';
                }
                requests.createTeacher(createData)
                    .then(() => {
                        dispatch(adminTeachersActions.createTeacherSuccess());
                        fireToast( I18n.t('admin.teachers.success.create.title'), I18n.t('admin.teacherss.success.create.description'),'success', 'check' );
                        dispatch(adminTeachersActions.getTeachers());
                        dispatch(adminTeachersActions.adminTeachersChangeModalState(MODAL_STATES.CLOSED));
                    })
                    .catch(() => {
                        dispatch(adminTeachersActions.createTeacherError());
                        fireToast( I18n.t('admin.teachers.error.create.title'), I18n.t('admin.teachers.error.create.description'), 'error', 'warning' );    
                    });
                break;

            case UPDATE_TEACHER:
                const updateSelectedTeacher = getState().admin.teachers.selectedTeacher;
                let updateData = formToDataTransform(getState().admin.teachers.teacherForm);
                // take missing data (not shown in form) and add it in order to make the request
                // take data from getState().selectedTeacher and insert it into data!
                updateData.avatarUrl = updateSelectedTeacher.avatarUrl || null;
                updateData.id = updateSelectedTeacher.id;
                updateData.role = updateSelectedTeacher.role;
                if (updateData.password === '') {
                    updateData.password = updateSelectedTeacher.password;
                }
                console.log(updateData);
                requests.updateTeacher(updateData)
                    .then(() => {
                        dispatch(adminTeachersActions.updateTeacherSuccess());
                        fireToast( I18n.t('admin.teachers.success.update.title'), I18n.t('admin.teachers.success.update.description'), 'success', 'check' );
                        dispatch(adminTeachersActions.getTeachers());
                        dispatch(adminTeachersActions.adminTeachersChangeModalState(MODAL_STATES.CLOSED));
                    })
                    .catch(() => {
                        dispatch(adminTeachersActions.updateTeacherError());
                        fireToast( I18n.t('admin.teachers.error.update.title'), I18n.t('admin.teachers.error.update.description'), 'error', 'warning' );
                    });
                break;

            case DELETE_TEACHER:
                requests.deleteTeacher(action.id)
                    .then(() => {
                        dispatch(adminTeachersActions.deleteTeacherSuccess());
                        fireToast( I18n.t('admin.teachers.success.delete.title'), I18n.t('admin.teachers.success.delete.description'), 'success', 'check' );
                        dispatch(adminTeachersActions.selectTeacher(null));
                        dispatch(adminTeachersActions.getTeachers());
                        dispatch(adminTeachersActions.adminTeachersChangeModalState(MODAL_STATES.CLOSED));
                    })
                    .catch(() => {
                        dispatch(adminTeachersActions.deleteTeacherError())
                        fireToast( I18n.t('admin.teachers.error.delete.title'), I18n.t('admin.teachers.error.delete.description'), 'error', 'warning' );
                    });
                break;

            default: break;
    }
};

export default adminTeachersMiddleware;