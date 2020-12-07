import { FIELD_TYPES, GENRES, MODAL_STATES, REQUEST_STATUS } from '../../../utils/consts';
import { dataToFormTransform } from '../../../utils/dataFormTransform';
import verifyInput from '../../../utils/verifyInput';
import {
    COMPLETE_MY_DATA, COMPLETE_MY_DATA_SUCCESS, COMPLETE_MY_DATA_ERROR,
    GET_MYSELF_DATA, GET_MYSELF_DATA_SUCCESS, GET_MYSELF_DATA_ERROR,
    UNVERIFIED_CHANGE_MODAL_STATE,
    UNVERIFIED_INPUT_CHANGE,
} from './unverified.actions';

const _today = new Date();
const initialState = {
    modalState: MODAL_STATES.CLOSED,
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
    },
    
    myData: null,
    completeMyDataStatus: REQUEST_STATUS.NONE,
    getMyselfDataStatus: REQUEST_STATUS.NONE,
};

const unverifiedReducer = (state = initialState, action) => {
    switch (action.type) {
        case UNVERIFIED_CHANGE_MODAL_STATE:
            if (action.modalState === MODAL_STATES.EDIT) {
                const newStudentForm = dataToFormTransform(state.myData, state.form);
                return { ...state, modalState: action.modalState, form: newStudentForm };    
            } else {
                return { ...state, modalState: action.modalState, form: initialState.form };
            };
        case UNVERIFIED_INPUT_CHANGE:
            const { id, typedD, value } = action;
            const error = !verifyInput(id, typedD, value);
            return {
                ...state,
                form: {
                    ...state.form,
                    [id]: {
                        ...state.form[id],
                        value,
                        error
                    }
                }
            };
        case COMPLETE_MY_DATA: return { ...state, completeMyDataStatus: REQUEST_STATUS.LOADING }
        case COMPLETE_MY_DATA_SUCCESS: return { ...state, completeMyDataStatus: REQUEST_STATUS.SUCCESS, myData: action.response }
        case COMPLETE_MY_DATA_ERROR: return { ...state, completeMyDataStatus: REQUEST_STATUS.ERROR }

        case GET_MYSELF_DATA: return { ...state, getMyselfDataStatus: REQUEST_STATUS.LOADING };
        case GET_MYSELF_DATA_SUCCESS: return { ...state, getMyselfDataStatus: REQUEST_STATUS.SUCCESS, myData: action.response };
        case GET_MYSELF_DATA_ERROR: return { ...state, getMyselfDataStatus: REQUEST_STATUS.ERROR };

        default: return state;
    }
};

export default unverifiedReducer;