import {
    GET_STUDENTS, GET_STUDENTS_SUCCESS, GET_STUDENTS_ERROR,
    ADMIN_STUDENTS_INPUT_CHANGE,
    ADMIN_STUDENTS_CHANGE_MODAL_STATE,
    SELECT_STUDENT,
    CREATE_STUDENT, CREATE_STUDENT_SUCCESS, CREATE_STUDENT_ERROR,
    UPDATE_STUDENT, UPDATE_STUDENT_SUCCESS, UPDATE_STUDENT_ERROR,
    DELETE_STUDENT, DELETE_STUDENT_SUCCESS, DELETE_STUDENT_ERROR
} from './admin.students.actions';
import { REQUEST_STATUS, MODAL_STATES, FIELD_TYPES, GENRES } from '../../../../utils/consts';
import { LOGOUT } from '../../../session/session.actions';
import { dataToFormTransform } from '../../../../utils/dataFormTransform';

const initialState = {
    students: [],
    selectedStudent: null,
    modalState: MODAL_STATES.CLOSED,
    getStudentsStatus: REQUEST_STATUS.NONE,
    createStudentStatus: REQUEST_STATUS.NONE,
    updateStudentStatus: REQUEST_STATUS.NONE,
    deleteStudentStatus: REQUEST_STATUS.NONE,
    studentForm: {
        name: { id: 'name', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.name', label: 'forms.name', required: false },
        surname: { id: 'surname', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.surname', label: 'forms.surname', required: false },
        email: { id: 'email', value: '', error: false, type: FIELD_TYPES.EMAIL, placeholder: 'forms.email', label: 'forms.email', required: false },
        password: { id: 'password', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.password', label: 'forms.password', required: false },
        dni: { id: 'dni', value: '', error: false, type: FIELD_TYPES.NUMBER, placeholder: 'forms.dni', label: 'forms.dni', required: false },
        sex: { id: 'sex', value: GENRES.FEMENINE, error: false, type: FIELD_TYPES.BOOLEAN, placeholder: 'forms.sex', label: 'forms.sex', required: false },
        birthday: { id: 'birthday', value: new Date().getTime(), error: false, type: FIELD_TYPES.DATE, placeholder: 'forms.birthday', label: 'forms.birthday', required: false },
        phoneNumber: { id: 'phoneNumber', value: '', error: false, type: FIELD_TYPES.NUMBER, placeholder: 'forms.phoneNumber', label: 'forms.phoneNumber', required: false },
        address: { id: 'address', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.address', label: 'forms.address', required: false },
        socialPlan: { id: 'socialPlan', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.socialPlan', label: 'forms.socialPlan', required: false },
        affiliateNumber: { id: 'affiliateNumber', value: '', error: false, type: FIELD_TYPES.NUMBER, placeholder: 'forms.affiliateNumber', label: 'forms.affiliateNumber', required: false },
        inscriptionDate: { id: 'inscriptionDate', value: new Date().getTime(), error: false, type: FIELD_TYPES.DATE, placeholder: 'forms.inscriptionDate', label: 'forms.inscriptionDate', required: false },
        fatherName: { id: 'fatherName', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.fatherName', label: 'forms.fatherName', required: false },
        fatherSurname: { id: 'fatherSurname', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.fatherSurname', label: 'forms.fatherSurname', required: false },
        fatherEmail: { id: 'fatherEmail', value: '', error: false, type: FIELD_TYPES.EMAIL, placeholder: 'forms.fatherEmail', label: 'forms.fatherEmail', required: false },
        fatherPhone: { id: 'fatherPhone', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.fatherPhone', label: 'forms.fatherPhone', required: false },
        motherName: { id: 'motherName', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.motherName', label: 'forms.motherName', required: false },
        motherSurname: { id: 'motherSurname', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.motherSurname', label: 'forms.motherSurname', required: false },
        motherEmail: { id: 'motherEmail', value: '', error: false, type: FIELD_TYPES.EMAIL, placeholder: 'forms.motherEmail', label: 'forms.motherEmail', required: false },
        motherPhone: { id: 'motherPhone', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.motherPhone', label: 'forms.motherPhone', required: false },
        verified: { id: 'verified', value: false, error: false, type: FIELD_TYPES.BOOLEAN, placeholder: 'forms.verified', label: 'forms.verified', required: false },
    }
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        /* get students */
        case GET_STUDENTS: return { ...state, getStudentsStatus: REQUEST_STATUS.LOADING };
        case GET_STUDENTS_SUCCESS: return { ...state, getStudentsStatus: REQUEST_STATUS.SUCCESS, students: action.response };
        case GET_STUDENTS_ERROR: return { ...state, getStudentsStatus: REQUEST_STATUS.ERROR };

        /* other */
        case ADMIN_STUDENTS_INPUT_CHANGE:
            const { id, value } = action;
            return {
                ...state,
                studentForm: {
                    ...state.studentForm,
                    [id]: {
                        ...state.studentForm[id],
                        value
                    }
                }
            };

        case ADMIN_STUDENTS_CHANGE_MODAL_STATE:
            // si pasa a edicion poblar el form con los datos del selectedStudent
            if (action.modalState === MODAL_STATES.EDIT) {
                const newStudentForm = dataToFormTransform(state.selectedStudent, state.studentForm);
                return { ...state, modalState: action.modalState, studentForm: newStudentForm };
            } else {
                // preview utiliza selectedStudent solo, delete utiliza data solo y create utiliza el form solo
                return { ...state, modalState: action.modalState, studentForm: initialState.studentForm };
            }

        case SELECT_STUDENT: return { ...state, selectedStudent: action.student };

        /* create student */
        case CREATE_STUDENT: return { ...state, createStudentStatus: REQUEST_STATUS.LOADING };
        case CREATE_STUDENT_SUCCESS: return { ...state, createStudentStatus: REQUEST_STATUS.SUCCESS };
        case CREATE_STUDENT_ERROR: return { ...state, createStudentStatus: REQUEST_STATUS.ERROR };

        /* update student */
        case UPDATE_STUDENT: return { ...state, updateStudentStatus: REQUEST_STATUS.LOADING };
        case UPDATE_STUDENT_SUCCESS: return { ...state, updateStudentStatus: REQUEST_STATUS.SUCCESS, };
        case UPDATE_STUDENT_ERROR: return { ...state, updateStudentStatus: REQUEST_STATUS.ERROR };

        /* delete student */
        case DELETE_STUDENT: return { ...state, deleteStudentStatus: REQUEST_STATUS.LOADING };
        case DELETE_STUDENT_SUCCESS: return { ...state, deleteStudentStatus: REQUEST_STATUS.SUCCESS, };
        case DELETE_STUDENT_ERROR: return { ...state, deleteStudentStatus: REQUEST_STATUS.ERROR };

        case LOGOUT: return initialState;

        default: return state;
    }
};

export default adminReducer;