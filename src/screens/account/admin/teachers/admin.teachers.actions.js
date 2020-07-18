export const GET_TEACHERS = 'GET_TEACHERS';
export const GET_TEACHERS_SUCCESS = 'GET_TEACHERS_SUCCESS';
export const GET_TEACHERS_ERROR = 'GET_TEACHERS_ERROR';

export const ADMIN_TEACHERS_INPUT_CHANGE = 'ADMIN_TEACHERS_INPUT_CHANGE';
export const ADMIN_TEACHERS_CHANGE_MODAL_STATE = 'ADMIN_TEACHERS_CHANGE_MODAL_STATE';
export const SELECT_TEACHER = 'SELECT_TEACHER';

export const CREATE_TEACHER = 'CREATE_TEACHER';
export const CREATE_TEACHER_SUCCESS = 'CREATE_TEACHER_SUCCESS';
export const CREATE_TEACHER_ERROR = 'CREATE_TEACHER_ERROR';

export const UPDATE_TEACHER = 'UPDATE_TEACHER';
export const UPDATE_TEACHER_SUCCESS = 'UPDATE_TEACHER_SUCCESS';
export const UPDATE_TEACHER_ERROR = 'UPDATE_TEACHER_ERROR';

export const DELETE_TEACHER = 'DELETE_TEACHER';
export const DELETE_TEACHER_SUCCESS = 'DELETE_TEACHER_SUCCESS';
export const DELETE_TEACHER_ERROR = 'DELETE_TEACHER_ERROR';


const adminTeachersActions = {
    getTeachers: () => ({type: GET_TEACHERS}),
    getTeachersSuccess: (response) => ({type: GET_TEACHERS_SUCCESS, response}),
    getTeachersError: () => ({type: GET_TEACHERS_ERROR}),

    adminTeachersInputChange: (id, value) => ({type: ADMIN_TEACHERS_INPUT_CHANGE, id, value}),
    adminTeachersChangeModalState: (modalState) => ({type: ADMIN_TEACHERS_CHANGE_MODAL_STATE, modalState}),
    selectTeacher: (teacher) => ({type: SELECT_TEACHER, teacher}),

    createTeacher: (data) => ({type: CREATE_TEACHER, data}),
    createTeacherSuccess: () => ({type: CREATE_TEACHER_SUCCESS}),
    createTeacherError: () => ({type: CREATE_TEACHER_ERROR}),

    updateTeacher: (data) => ({type: UPDATE_TEACHER, data}),
    updateTeacherSuccess: () => ({type: UPDATE_TEACHER_SUCCESS}),
    updateTeacherError: () => ({type: UPDATE_TEACHER_ERROR}),

    deleteTeacher: (id) => ({type: DELETE_TEACHER, id}),
    deleteTeacherSuccess: () => ({type: DELETE_TEACHER_SUCCESS}),
    deleteTeacherError: () => ({type: DELETE_TEACHER_ERROR})
};

export default adminTeachersActions;