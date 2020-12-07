import {
    ADMIN_GET_STUDENTS,
    ADMIN_STUDENTS_CHANGE_MODAL_STATE,
    CREATE_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT
} from './admin.students.actions';
import requests from './admin.students.services';
import adminStudentsActions from './admin.students.actions';
import { MODAL_STATES } from '../../../../utils/consts';
import { formToDataTransform } from '../../../../utils/dataFormTransform';
import fireToast from '../../../common/components/Toaster';
import { I18n } from 'react-redux-i18n';


const adminStudentsMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);
    switch (action.type) {
        case ADMIN_GET_STUDENTS:
            requests.getStudents()
                .then(response => dispatch(adminStudentsActions.getStudentsSuccess(response)))
                .catch(() => dispatch(adminStudentsActions.getStudentsError()));
            break;

        case ADMIN_STUDENTS_CHANGE_MODAL_STATE:
            action.modalState === MODAL_STATES.CLOSED && dispatch(adminStudentsActions.selectStudent(null));
            break;

        case CREATE_STUDENT:
            const createSelectedStudent = getState().admin.students.selectedStudent;
            let createData = formToDataTransform(getState().admin.students.studentForm);
            // take data from getState().selectedStudent and insert it into data!
            createData.avatarUrl = '';
            createData.complete = true;  // TODO
            createData.id = 0;
            createData.role = 'STUDENT';
            requests.createStudent(createData)
                .then(() => {
                    dispatch(adminStudentsActions.createStudentSuccess());
                    fireToast( I18n.t('admin.students.success.create.title'), I18n.t('admin.students.success.create.description'),'success', 'check' );
                    dispatch(adminStudentsActions.getStudents());
                    dispatch(adminStudentsActions.adminStudentsChangeModalState(MODAL_STATES.CLOSE));
                })
                .catch(() => {
                    fireToast( I18n.t('admin.students.error.create.title'), I18n.t('admin.students.error.create.description'), 'error', 'warning' );
                    dispatch(adminStudentsActions.createStudentError())
                });
            break;

        case UPDATE_STUDENT:
            const updateSelectedStudent = getState().admin.students.selectedStudent;
            let updateData = formToDataTransform(getState().admin.students.studentForm);
            updateData.avatarUrl = updateSelectedStudent.avatarUrl || null;
            updateData.complete = updateSelectedStudent.complete;
            updateData.id = updateSelectedStudent.id;
            updateData.role = updateSelectedStudent.role;
            requests.updateStudent(updateData)
                .then((respose) => {
                    dispatch(adminStudentsActions.updateStudentSuccess());
                    fireToast( I18n.t('admin.students.success.update.title'), I18n.t('admin.students.success.update.description'), 'success', 'check' );
                    dispatch(adminStudentsActions.getStudents());
                    dispatch(adminStudentsActions.adminStudentsChangeModalState(MODAL_STATES.CLOSE));
                })
                .catch(() => {
                    fireToast( I18n.t('admin.students.error.update.title'), I18n.t('admin.students.error.update.description'), 'error', 'warning' );
                    dispatch(adminStudentsActions.updateStudentError())
                });
            break;

        case DELETE_STUDENT:
            requests.deleteStudent(action.id)
                .then(() => {
                    // console.log('delete student nice');
                    dispatch(adminStudentsActions.deleteStudentSuccess());
                    fireToast( I18n.t('admin.students.success.delete.title'), I18n.t('admin.students.success.delete.description'), 'success', 'check' );
                    dispatch(adminStudentsActions.selectStudent(null));
                    dispatch(adminStudentsActions.getStudents());
                    dispatch(adminStudentsActions.adminStudentsChangeModalState(MODAL_STATES.CLOSED));
                })
                .catch(() => {
                    // console.log('delete student bad');
                    dispatch(adminStudentsActions.deleteStudentError());
                    fireToast( I18n.t('admin.students.error.delete.title'), I18n.t('admin.students.error.delete.description'), 'error', 'warning' );
                });
            break;

        default: break;
    }
};

export default adminStudentsMiddleware;