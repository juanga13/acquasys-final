import {
    STUDENT_GET_LESSONS, STUDENT_GET_LESSONS_SUCCESS, STUDENT_GET_LESSONS_ERROR,
    STUDENT_GET_PAYMENTS, STUDENT_GET_PAYMENTS_SUCCESS, STUDENT_GET_PAYMENTS_ERROR,
    STUDENT_GET_CALENDAR, STUDENT_GET_CALENDAR_SUCCESS, STUDENT_GET_CALENDAR_ERROR,
    SUBSCRIBE_LESSON, SUBSCRIBE_LESSON_SUCCESS, SUBSCRIBE_LESSON_ERROR,
    UNSUBSCRIBE_LESSON, UNSUBSCRIBE_LESSON_SUCCESS, UNSUBSCRIBE_LESSON_ERROR,
    STUDENT_CHANGE_MODAL_STATE,
    STUDENT_INPUT_CHANGE,
    GET_MY_ENROLLED, GET_MY_ENROLLED_SUCCESS, GET_MY_ENROLLED_ERROR,
    GET_MYSELF_DATA, GET_MYSELF_DATA_SUCCESS, GET_MYSELF_DATA_ERROR, STUDENT_SELECT_PAYMENT,
    UPDATE_MY_DATA_REQUEST, UPDATE_MY_DATA_REQUEST_SUCCESS, UPDATE_MY_DATA_REQUEST_ERROR,
} from './student.actions';
import { REQUEST_STATUS, MODAL_STATES, FIELD_TYPES, GENRES } from '../../../utils/consts';
import verifyInput from '../../../utils/verifyInput';
import { dataToFormTransform } from '../../../utils/dataFormTransform';

const _today = new Date();
const initialState = {
    /* profile and other */
    modalState: MODAL_STATES.CLOSED,  // only modal edit available in profile of student 
    myEnrolled: [],
    getMyEnrolledStatus: REQUEST_STATUS.NONE,
    myData: null,
    getMyselfDataStatus: REQUEST_STATUS.NONE,
    form: {
        name: { id: 'name', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.name', label: 'forms.name', required: true },
        surname: { id: 'surname', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.surname', label: 'forms.surname', required: true },
        email: { id: 'email', value: '', error: false, type: FIELD_TYPES.EMAIL, placeholder: 'forms.email', label: 'forms.email', required: true },
        password: { id: 'password', value: '', error: false, type: FIELD_TYPES.PASSWORD, placeholder: 'forms.password', label: 'forms.password', required: true },
        dni: { id: 'dni', value: '', error: false, type: FIELD_TYPES.NUMBER, placeholder: 'forms.dni', label: 'forms.dni', required: true },
        sex: { id: 'sex', value: GENRES.FEMENINE, error: false, type: FIELD_TYPES.BOOLEAN, placeholder: 'forms.sex', label: 'forms.sex', required: true },
        birthday: { id: 'birthday', value: _today.getTime(), error: false, type: FIELD_TYPES.DATE, placeholder: 'forms.birthday', label: 'forms.birthday', required: true, maxDate: _today },
        phoneNumber: { id: 'phoneNumber', value: '', error: false, type: FIELD_TYPES.NUMBER, placeholder: 'forms.phoneNumber', label: 'forms.phoneNumber', required: true },
        address: { id: 'address', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.address', label: 'forms.address', required: true },
        socialPlan: { id: 'socialPlan', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.socialPlan', label: 'forms.socialPlan', required: true },
        affiliateNumber: { id: 'affiliateNumber', value: '', error: false, type: FIELD_TYPES.NUMBER, placeholder: 'forms.affiliateNumber', label: 'forms.affiliateNumber', required: true },
        inscriptionDate: { id: 'inscriptionDate', value: _today.getTime(), error: false, type: FIELD_TYPES.DATE, placeholder: 'forms.inscriptionDate', label: 'forms.inscriptionDate', required: true, maxDate: _today },

        // optional data
        fatherName: { id: 'fatherName', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.fatherName', label: 'forms.fatherName', required: false },
        fatherSurname: { id: 'fatherSurname', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.fatherSurname', label: 'forms.fatherSurname', required: false },
        fatherEmail: { id: 'fatherEmail', value: '', error: false, type: FIELD_TYPES.EMAIL, placeholder: 'forms.fatherEmail', label: 'forms.fatherEmail', required: false },
        fatherPhone: { id: 'fatherPhone', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.fatherPhone', label: 'forms.fatherPhone', required: false },
        motherName: { id: 'motherName', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.motherName', label: 'forms.motherName', required: false },
        motherSurname: { id: 'motherSurname', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.motherSurname', label: 'forms.motherSurname', required: false },
        motherEmail: { id: 'motherEmail', value: '', error: false, type: FIELD_TYPES.EMAIL, placeholder: 'forms.motherEmail', label: 'forms.motherEmail', required: false },
        motherPhone: { id: 'motherPhone', value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.motherPhone', label: 'forms.motherPhone', required: false },
        
        verified: { id: 'verified', value: false, error: false, type: FIELD_TYPES.BOOLEAN, placeholder: 'forms.verified', label: 'forms.verified', required: false },
    },
    updateMyDataStatus: REQUEST_STATUS.NONE,

    /* calendar */
    calendar: null,
    getCalendarStatus: REQUEST_STATUS.NONE,
    
    /* lessons */
    lessons: [],
    getLessonsStatus: REQUEST_STATUS.NONE,
    selectedLesson: null,
    subscribeLessonStatus: REQUEST_STATUS.NONE,
    unsubscribeLessonStatus: REQUEST_STATUS.NONE,
    
    /* payment */
    payments: [],
    getPaymentsStatus: REQUEST_STATUS.NONE,
    selectedPayment: null,
    
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        /* profile and other */
        case STUDENT_CHANGE_MODAL_STATE: 
            if (action.modalState === MODAL_STATES.EDIT) {
                const newStudentForm = dataToFormTransform(state.myData, state.form);
                return { ...state, modalState: action.modalState, form: newStudentForm };    
            } else {
                // preview utiliza selectedStudent solo, delete utiliza data solo y create utiliza el form solo
                return { ...state, modalState: action.modalState, form: initialState.form };
            };
            
        case STUDENT_INPUT_CHANGE: 
            const { id, typedD, value } = action;
            const error = !verifyInput(id, typedD, value);
            return {
                ...state,
                studentForm: {
                    ...state.studentForm,
                    [id]: {
                        ...state.studentForm[id],
                        value,
                        error
                    }
                }
            };

        case GET_MY_ENROLLED: return { ...state, getMyEnrolledStatus: REQUEST_STATUS.LOADING };
        case GET_MY_ENROLLED_SUCCESS: return { ...state, getMyEnrolledStatus: REQUEST_STATUS.SUCCESS, myEnrolled: action.response };
        case GET_MY_ENROLLED_ERROR: return { ...state, getMyEnrolledStatus: REQUEST_STATUS.ERROR };

        case GET_MYSELF_DATA: return { ...state, getMyselfDataStatus: REQUEST_STATUS.LOADING };
        case GET_MYSELF_DATA_SUCCESS: return { ...state, getMyselfDataStatus: REQUEST_STATUS.SUCCESS, myData: action.response };
        case GET_MYSELF_DATA_ERROR: return { ...state, getMyselfDataStatus: REQUEST_STATUS.ERROR };

        /* calendar */
        case STUDENT_GET_CALENDAR: return { ...state, getCalendarStatus: REQUEST_STATUS.LOADING };
        case STUDENT_GET_CALENDAR_SUCCESS: return { ...state, getCalendarStatus: REQUEST_STATUS.SUCCESS, calendar: action.response };
        case STUDENT_GET_CALENDAR_ERROR: return { ...state, getCalendarStatus: REQUEST_STATUS.ERROR };
        case UPDATE_MY_DATA_REQUEST: return { ...state, updateMyDataStatus: REQUEST_STATUS.LOADING };
        case UPDATE_MY_DATA_REQUEST_SUCCESS: return { ...state, updateMyDataStatus: REQUEST_STATUS.SUCCESS };
        case UPDATE_MY_DATA_REQUEST_ERROR: return { ...state, updateMyDataStatus: REQUEST_STATUS.ERROR };
        /* lessons */
        case STUDENT_GET_LESSONS: return { ...state, getLessonsStatus: REQUEST_STATUS.LOADING };
        case STUDENT_GET_LESSONS_SUCCESS: return { ...state, getLessonsStatus: REQUEST_STATUS.SUCCESS, lessons: action.response };
        case STUDENT_GET_LESSONS_ERROR: return { ...state, getLessonsStatus: REQUEST_STATUS.ERROR };
        
        case SUBSCRIBE_LESSON: return { ...state, subscribeLessonStatus: REQUEST_STATUS.LOADING };
        case SUBSCRIBE_LESSON_SUCCESS: return { ...state, subscribeLessonStatus: REQUEST_STATUS.SUCCESS };
        case SUBSCRIBE_LESSON_ERROR: return { ...state, subscribeLessonStatus: REQUEST_STATUS.ERROR };

        case UNSUBSCRIBE_LESSON: return { ...state, unsubscribeLessonStatus: REQUEST_STATUS.LOADING };
        case UNSUBSCRIBE_LESSON_SUCCESS: return { ...state, unsubscribeLessonStatus: REQUEST_STATUS.SUCCESS };
        case UNSUBSCRIBE_LESSON_ERROR: return { ...state, unsubscribeLessonStatus: REQUEST_STATUS.ERROR };

        /* payment */
        case STUDENT_GET_PAYMENTS: return { ...state, getPaymentsStatus: REQUEST_STATUS.LOADING };
        case STUDENT_GET_PAYMENTS_SUCCESS: return { ...state, getPaymentsStatus: REQUEST_STATUS.SUCCESS, payments: action.response };
        case STUDENT_GET_PAYMENTS_ERROR: return { ...state, getPaymentsStatus: REQUEST_STATUS.ERROR };

        case STUDENT_SELECT_PAYMENT: return { ...state, selectedPayment: action.payment };


        default: return state;
    }
};

export default studentReducer;