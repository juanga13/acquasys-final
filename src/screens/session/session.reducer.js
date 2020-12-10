import {
    LOGIN, LOGIN_SUCCESS, LOGIN_ERROR,
    REGISTER, REGISTER_SUCCESS, REGISTER_ERROR,
    REFRESH_TOKEN, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_ERROR,
    GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_ERROR,
    LOGOUT,
    SESSION_INPUT_CHANGE
} from './session.actions';
import { REQUEST_STATUS, FIELD_TYPES } from '../../utils/consts';
import verifyInput from '../../utils/verifyInput';

const initialState = {
    isLoggedIn: false,
    loginStatus: REQUEST_STATUS.NONE,
    registerStatus: REQUEST_STATUS.NONE,
    refreshStatus: REQUEST_STATUS.NONE,
    profile: null,
    getProfileStatus: REQUEST_STATUS.NONE,
    forms: {
        login: {
            // admin
            // email: { id: 'email', value: 'admin@admin.com', error: false , type: FIELD_TYPES.EMAIL, placeholder: 'forms.email', label: 'forms.email' },
            // password: { id: 'password', value: 'asd123', error: false , type: FIELD_TYPES.PASSWORD, placeholder: 'forms.passwordPlease', label: 'forms.passwordPlease' }
            // juanga student
            // email: { id: 'email', value: 'riccijuanga@gmail.com', error: false , type: FIELD_TYPES.EMAIL, placeholder: 'forms.email', label: 'forms.email' },
            // password: { id: 'password', value: 'asd123', error: false , type: FIELD_TYPES.PASSWORD, placeholder: 'forms.passwordPlease', label: 'forms.passwordPlease' }
            // facu teacher 
            email: { id: 'email', value: 'facufacundo@gmail.com', error: false , type: FIELD_TYPES.EMAIL, placeholder: 'forms.email', label: 'forms.email' },
            password: { id: 'password', value: 'asd123', error: false , type: FIELD_TYPES.PASSWORD, placeholder: 'forms.passwordPlease', label: 'forms.passwordPlease' }

            // default
            // email: { id: 'email', value: '', error: false , type: FIELD_TYPES.EMAIL, placeholder: 'forms.email', label: 'forms.email' },
            // password: { id: 'password', value: '', error: false , type: FIELD_TYPES.PASSWORD, placeholder: 'forms.passwordPlease', label: 'forms.passwordPlease' }
        },
        register: {
            email: { id: 'email', value: '', error: false , type: FIELD_TYPES.EMAIL, placeholder: 'forms.email', label: 'forms.email' },
            password: { id: 'password', value: '', error: false , type: FIELD_TYPES.PASSWORD, placeholder: 'forms.passwordPlease', label: 'forms.passwordPlease' }
        }
    }
}

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SESSION_INPUT_CHANGE:
            const { formType, id, typeD, value } = action;
            const error = !verifyInput(id, typeD, value);
            return { 
                ...state, 
                forms: { 
                    ...state.forms, 
                    [formType]: { 
                        ...state.forms[formType], 
                        [id]: { 
                            ...state.forms[formType][id], 
                            value,
                            error
                        } 
                    }
                }
            };

        /* Login */
        case LOGIN: return { ...state, isLoggedIn: false, loginStatus: REQUEST_STATUS.LOADING, refreshResponse: null, refreshStatus: REQUEST_STATUS.NONE };
        case LOGIN_SUCCESS: return { ...state, isLoggedIn: true, loginResponse: action.response, loginStatus: REQUEST_STATUS.SUCCESS };
        case LOGIN_ERROR: return { ...state, isLoggedIn: false, loginStatus: REQUEST_STATUS.ERROR };

        /** Register */
        case REGISTER: return { ...state, registerStatus: REQUEST_STATUS.LOADING };
        case REGISTER_SUCCESS: return { ...state, registerStatus: REQUEST_STATUS.SUCCESS };
        case REGISTER_ERROR: return { ...state, registerStatus: REQUEST_STATUS.ERROR };

        /* Refresh token */
        case REFRESH_TOKEN: return { ...state, isLoggedIn: false, refreshStatus: REQUEST_STATUS.LOADING };
        case REFRESH_TOKEN_SUCCESS: return { ...state, isLoggedIn: true, refreshResponse: action.response, refreshStatus: REQUEST_STATUS.SUCCESS };
        case REFRESH_TOKEN_ERROR: return { ...state, isLoggedIn: false, refreshStatus: REQUEST_STATUS.ERROR };

        /* Get profile */
        case GET_PROFILE: return { ...state, getProfileStatus: REQUEST_STATUS.LOADING };
        case GET_PROFILE_SUCCESS: return { ...state, getProfileStatus: REQUEST_STATUS.SUCCESS, profile: action.response };
        case GET_PROFILE_ERROR: return { ...state, getProfileStatus: REQUEST_STATUS.ERROR };

        /* Logout */
        case LOGOUT: return initialState;

        default: return state;
    }
}

export default sessionReducer