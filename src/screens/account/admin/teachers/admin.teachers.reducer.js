import {
    GET_TEACHERS, GET_TEACHERS_SUCCESS, GET_TEACHERS_ERROR,
    ADMIN_TEACHERS_INPUT_CHANGE,
    ADMIN_TEACHERS_CHANGE_MODAL_STATE,
    SELECT_TEACHER,
    CREATE_TEACHER, CREATE_TEACHER_SUCCESS, CREATE_TEACHER_ERROR,
    UPDATE_TEACHER, UPDATE_TEACHER_SUCCESS, UPDATE_TEACHER_ERROR,
    DELETE_TEACHER, DELETE_TEACHER_SUCCESS, DELETE_TEACHER_ERROR
} from './admin.teachers.actions';
import { FIELD_TYPES, REQUEST_STATUS, MODAL_STATES, GENRES } from '../../../../utils/consts';
import { dataToFormTransform } from '../../../../utils/dataFormTransform';
import { LOGOUT } from '../../../session/session.actions';

const initialState = {
    teachers: [],
    selectedTeacher: null,
    modalState: MODAL_STATES.CLOSED,
    getTeachersStatus: REQUEST_STATUS.NONE,
    createTeacherStatus: REQUEST_STATUS.NONE,
    updateTeacherStatus: REQUEST_STATUS.NONE,
    deleteTeacherStatus: REQUEST_STATUS.NONE,
    teacherForm: {
        email: { id: 'email', value: '', error: false, type: FIELD_TYPES.EMAIL, placeholder: 'forms.email', label: 'forms.email', required: false },
        password: { id: 'password', value: '', error: false, type: FIELD_TYPES.PASSWORD, placeholder: 'forms.password', label: 'forms.password', required: false },
        name: { id: 'name', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.name', label: 'forms.name', required: false },
        surname: { id: 'surname', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.surname', label: 'forms.surname', required: false },
        dni: { id: 'dni', value: '', error: false, type: FIELD_TYPES.NUMBER, placeholder: 'forms.dni', label: 'forms.dni', required: false },
        cuil: { id: 'cuil', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.cuil', label: 'forms.cuil', required: false },
        sex: { id: 'sex', value: GENRES.FEMENINE, error: false, type: FIELD_TYPES.BOOLEAN, placeholder: 'forms.sex', label: 'forms.sex', required: false },
        phoneNumber: { id: 'phoneNumber', value: '', error: false, type: FIELD_TYPES.NUMBER, placeholder: 'forms.phoneNumber', label: 'forms.phoneNumber', required: false },
        // "avatarUrl": "string",
        // "id": 0,
        // "role": "STUDENT",
    }
};

const adminTeachersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TEACHERS: return { ...state, getTeachersStatus: REQUEST_STATUS.LOADING };
        case GET_TEACHERS_SUCCESS: return { ...state, getTeachersStatus: REQUEST_STATUS.SUCCESS, teachers: action.response };
        case GET_TEACHERS_ERROR: return { ...state, getTeachersStatus: REQUEST_STATUS.ERROR };

        case ADMIN_TEACHERS_INPUT_CHANGE:
            const { id, value } = action;
            return {
                ...state,
                teacherForm: {
                    ...state.teacherForm,
                    [id]: {
                        ...state.teacherForm[id],
                        value
                    }
                }
            };

        case ADMIN_TEACHERS_CHANGE_MODAL_STATE:
            // si pasa a edicion poblar el form con los datos del selectedTeacher
            if (action.modalState === MODAL_STATES.EDIT) {
                const newTeacherForm = dataToFormTransform(state.selectedTeacher, state.teacherForm);
                return { ...state, modalState: action.modalState, teacherForm: newTeacherForm };
            }
            // preview utiliza selectedTeacher solo, delete utiliza data solo y create utiliza el form solo
            return { ...state, modalState: action.modalState, teacherForm: initialState.teacherForm };

        case SELECT_TEACHER: return { ...state, selectedTeacher: action.teacher };

        case CREATE_TEACHER: return { ...state, createTeacherStatus: REQUEST_STATUS.LOADING };
        case CREATE_TEACHER_SUCCESS: return { ...state, createTeacherStatus: REQUEST_STATUS.SUCCESS };
        case CREATE_TEACHER_ERROR: return { ...state, createTeacherStatus: REQUEST_STATUS.ERROR };

        case UPDATE_TEACHER: return { ...state, updateTeacherStatus: REQUEST_STATUS.LOADING };
        case UPDATE_TEACHER_SUCCESS: return { ...state, updateTeacherStatus: REQUEST_STATUS.SUCCESS };
        case UPDATE_TEACHER_ERROR: return { ...state, updateTeacherStatus: REQUEST_STATUS.ERROR };

        case DELETE_TEACHER: return { ...state, deleteTeacherStatus: REQUEST_STATUS.LOADING };
        case DELETE_TEACHER_SUCCESS: return { ...state, deleteTeacherStatus: REQUEST_STATUS.SUCCESS };
        case DELETE_TEACHER_ERROR: return { ...state, deleteTeacherStatus: REQUEST_STATUS.ERROR };
        
        case LOGOUT: return initialState;


        default: return state;
    }
};

export default adminTeachersReducer;