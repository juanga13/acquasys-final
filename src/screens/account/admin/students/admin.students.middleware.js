import {
    GET_STUDENTS,
    ADMIN_STUDENTS_CHANGE_MODAL_STATE,
    CREATE_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT
} from './admin.students.actions';
import requests from './admin.students.services';
import adminStudentsActions from './admin.students.actions';
import { MODAL_STATES } from '../../../../utils/consts';
import { formToDataTransform } from '../../../../utils/dataFormTransform';

const adminStudentsMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);
    switch (action.type) {
        case GET_STUDENTS:
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
            createData.complete = '';  // TODO
            createData.id = 0;
            createData.role = 'STUDENT';
            if (createData.password.value === '') {
                createData.password.value = 'asd123';
            }
            requests.createStudent(createData)
                .then(() => {
                    dispatch(adminStudentsActions.createStudentSuccess());
                    dispatch(adminStudentsActions.getStudents())
                    dispatch(adminStudentsActions.adminStudentsChangeModalState(MODAL_STATES.CLOSE))
                })
                .catch(() => dispatch(adminStudentsActions.createStudentError()));
            break;

        case UPDATE_STUDENT:
            const updateSelectedStudent = getState().admin.students.selectedStudent;
            let updateData = formToDataTransform(getState().admin.students.studentForm);
            updateData.avatarUrl = updateSelectedStudent.avatarUrl || null;
            updateData.complete = updateSelectedStudent.complete;
            updateData.id = updateSelectedStudent.id;
            updateData.role = updateSelectedStudent.role;
            if (updateData.password === '') {
                updateData.password = updateSelectedStudent.password;
            }
            requests.updateStudent(updateData)
                .then(() => {
                    dispatch(adminStudentsActions.updateStudentSuccess());
                    dispatch(adminStudentsActions.getStudents());
                })
                .catch(() => dispatch(adminStudentsActions.updateStudentError()));
            break;

        case DELETE_STUDENT:
            requests.deleteStudent(action.id)
                .then(() => {
                    console.log('delete student nice')
                    dispatch(adminStudentsActions.deleteStudentSuccess());
                    dispatch(adminStudentsActions.selectStudent(null));
                    dispatch(adminStudentsActions.adminStudentsChangeModalState(MODAL_STATES.CLOSED));
                })
                .catch(() => {
                    console.log('delete student bad')
                    dispatch(adminStudentsActions.deleteStudentError())
                });
            break;

        default: break;
    }
};

export default adminStudentsMiddleware;