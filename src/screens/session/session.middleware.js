import sessionActions, {
    LOGIN,
    REFRESH_TOKEN,
    GET_PROFILE,    
    LOGOUT,
    REGISTER,
} from './session.actions'
import requests from './session.services'
import { push } from 'connected-react-router'
import { ROLES } from '../../utils/consts';
import adminActions from '../account/admin/admin.actions';
// import studentActions from '../account/student/student.actions';
// import unverifiedActions from '../account/unverified/unverified.actions';
// import teacherActions from '../account/teacher/teacher.actions';

const sessionMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case LOGIN:
            const loginEmail = getState().session.forms.login.email.value;
            const loginPassword = getState().session.forms.login.password.value;
            requests.login(loginEmail, loginPassword)
                .then(data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role', data.role);
                    dispatch(sessionActions.loginSuccess());
                    dispatch(sessionActions.getProfile());
                    switch(data.role) {
                        case ROLES.ADMIN:
                            dispatch(adminActions.getAllData());
                            break;
                        case ROLES.STUDENT:
                            // dispatch(studentActions.getAllData());
                            break;
                        case ROLES.UNVERIFIED_STUDENT:
                            // dispatch(unverifiedActions.getStatus());
                            break;
                        case ROLES.TEACHER:
                            // dispatch(teacherActions.getAllData());
                            break;
                        default: break;
                    }
                })
                .catch(error => dispatch(sessionActions.loginError(error)))
            break;
            
        case REGISTER:
            const registerEmail = getState().session.forms.register.email.value;
            const registerPassword = getState().session.forms.register.password.value;
            requests.register(registerEmail, registerPassword)
                .then(response => {
                    dispatch(sessionActions.registerSuccess(response));
                    push('/login');
                })
                .catch(error => dispatch(sessionActions.registerError(error)))
            break;
            
        case REFRESH_TOKEN:
            requests.checkToken()
                .then(data => {
                    const role = localStorage.getItem('role');
                    dispatch(sessionActions.refreshTokenSuccess(data))
                    dispatch(sessionActions.getProfile());
                    switch(role) {
                        case ROLES.ADMIN:
                            dispatch(adminActions.getAllData());
                            break;
                        case ROLES.STUDENT:
                            // dispatch(studentActions.getAllData());
                            break;
                        case ROLES.UNVERIFIED_STUDENT:
                            // dispatch(unverifiedActions.getStatus());
                            break;
                        case ROLES.TEACHER:
                            // dispatch(teacherActions.getAllData());
                            break;
                        default: break;
                    }
                })
                .catch(error => dispatch(sessionActions.refreshTokenError(error)))
            break;
            
        case GET_PROFILE:
            requests.getProfile()
                .then(data => { dispatch(sessionActions.getProfileSuccess(data)) })
                .catch(error => { 
                    delete localStorage['token'];
                    delete localStorage['role'];
                    dispatch(sessionActions.getProfileError(error)) 
                })
            break;
                
        case LOGOUT:
            delete localStorage['token'];
            delete localStorage['role'];
            dispatch(push('/'));
            break;

        default:
            break;
    }
}

export default sessionMiddleware