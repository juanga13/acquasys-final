// students
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_STUDENTS_SUCCESS = 'GET_STUDENTS_SUCCESS';
export const GET_STUDENTS_ERROR = 'GET_STUDENTS_ERROR';

export const ADMIN_STUDENTS_INPUT_CHANGE = 'ADMIN_STUDENTS_INPUT_CHANGE';
export const ADMIN_STUDENTS_CHANGE_MODAL_STATE = 'ADMIN_STUDENTS_CHANGE_MODAL_STATE';
export const SELECT_STUDENT = 'SELECT_STUDENT';

export const CREATE_STUDENT = 'CREATE_STUDENT';
export const CREATE_STUDENT_SUCCESS = 'CREATE_STUDENT_SUCCESS';
export const CREATE_STUDENT_ERROR = 'CREATE_STUDENT_ERROR';

export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const UPDATE_STUDENT_SUCCESS = 'UPDATE_STUDENT_SUCCESS';
export const UPDATE_STUDENT_ERROR = 'UPDATE_STUDENT_ERROR';

export const DELETE_STUDENT = 'DELETE_STUDENT';
export const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS';
export const DELETE_STUDENT_ERROR = 'DELETE_STUDENT_ERROR';

const adminStudentsActions = {
    getStudents: () => ({ type: GET_STUDENTS }),
    getStudentsSuccess: (response) => ({ type: GET_STUDENTS_SUCCESS, response }),
    getStudentsError: () => ({ type: GET_STUDENTS_ERROR }),

    adminStudentsInputChange: (id, value) => ({type: ADMIN_STUDENTS_INPUT_CHANGE, id, value}),
    adminStudentsChangeModalState: (modalState) => ({type: ADMIN_STUDENTS_CHANGE_MODAL_STATE, modalState}),
    selectStudent: (student) => ({type: SELECT_STUDENT, student}),

    createStudent: (data) => ({ type: CREATE_STUDENT, data }),
    createStudentSuccess: () => ({ type: CREATE_STUDENT_SUCCESS }),
    createStudentError: () => ({ type: CREATE_STUDENT_ERROR }),

    updateStudent: (data) => ({ type: UPDATE_STUDENT, data }),
    updateStudentSuccess: () => ({ type: UPDATE_STUDENT_SUCCESS }),
    updateStudentError: () => ({ type: UPDATE_STUDENT_ERROR }),

    deleteStudent: (id) => ({ type: DELETE_STUDENT, id }),
    deleteStudentSuccess: () => ({ type: DELETE_STUDENT_SUCCESS }),
    deleteStudentError: () => ({ type: DELETE_STUDENT_ERROR }),
};

export default adminStudentsActions;