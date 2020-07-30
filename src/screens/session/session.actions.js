export const SESSION_INPUT_CHANGE = 'SESSION_INPUT_CHANGE';

export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';

export const GET_ROLE_DATA = 'GET_ROLE_DATA';

export const LOGOUT = 'LOGOUT';

const sessionActions = {
    sessionInputChange: (formType, id, value) => ({ type: SESSION_INPUT_CHANGE, formType, id, value }),

    getProfile: () => ({ type: GET_PROFILE }),
    getProfileSuccess: (response) => ({ type: GET_PROFILE_SUCCESS, response }),
    getProfileError: () => ({ type: GET_PROFILE_ERROR }),

    login: () => ({ type: LOGIN }),
    loginSuccess: () => ({ type: LOGIN_SUCCESS }),
    loginError: () => ({ type: LOGIN_ERROR }),

    register: () => ({ type: REGISTER }),
    registerSuccess: (response) => ({ type: REGISTER_SUCCESS, response }),
    registerError: () => ({ type: REGISTER_ERROR }),

    refreshToken: () => ({ type: REFRESH_TOKEN }),
    refreshTokenSuccess: (response) => ({ type: REFRESH_TOKEN_SUCCESS, response }),
    refreshTokenError: () => ({ type: REFRESH_TOKEN_ERROR }),

    getRoleData: () => ({ type: GET_ROLE_DATA }),

    logout: () => ({ type: LOGOUT }),
};

export default sessionActions;