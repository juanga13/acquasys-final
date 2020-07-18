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

const adminTeachersMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);
    switch (action.type) {
            case GET_TEACHERS:
                requests.getTeachers()
                    .then(response => dispatch(adminTeachersActions.getTeachersSuccess(response)))
                    .catch(dispatch(adminTeachersActions.getTeachersError()));
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
                        dispatch(adminTeachersActions.getTeachers())
                    })
                    .catch(dispatch(adminTeachersActions.createTeacherError()));
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
                requests.updateTeacher(updateData)
                    .then(() => {
                        dispatch(adminTeachersActions.updateTeacherSuccess());
                        dispatch(adminTeachersActions.getTeachers())
                    })
                    .catch(dispatch(adminTeachersActions.updateTeacherError()));
                break;

            case DELETE_TEACHER:
                requests.deleteTeacher(action.id)
                    .then(() => {
                        dispatch(adminTeachersActions.deleteTeacherSuccess());
                        dispatch(adminTeachersActions.selectTeacher(null));
                        dispatch(adminTeachersActions.getTeachers());
                    })
                    .catch(dispatch(adminTeachersActions.deleteTeacherError()));
                break;

            default: break;
    }
};

export default adminTeachersMiddleware;