import sessionActions, {
    GET_ROLE_DATA,
    LOGIN,
    REGISTER,
    REFRESH_TOKEN,
    GET_PROFILE,    
    LOGOUT,
} from './session.actions'
import requests from './session.services'
import { push } from 'connected-react-router'
import { ROLES } from '../../utils/consts';
import adminActions from '../account/admin/admin.actions';
import studentActions from '../account/student/student.actions';
import teacherActions from '../account/teacher/teacher.actions';
import { tenDaysBeforeNow } from '../../utils/time';
import commonActions from '../common/common.actions';
import { I18n } from 'react-redux-i18n';
import fireToast from '../common/components/Toaster';
import unverifiedActions from '../account/unverified/unverified.actions';

const sessionMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case GET_ROLE_DATA:
            dispatch(sessionActions.getProfile());
            dispatch(commonActions.getMessages());
            const role = localStorage.getItem('role');
            console.log('rol: ' + role);
            switch (role) {
                case ROLES.ADMIN:
                    // console.log('admin')
                    dispatch(adminActions.getAllData());
                    break;
                case ROLES.STUDENT:
                    // console.log('student')
                    dispatch(studentActions.getMyEnrolled());
                    dispatch(studentActions.getMyselfData());
                    dispatch(studentActions.getCalendar(tenDaysBeforeNow().getTime(), new Date().getTime()));
                    dispatch(studentActions.getPayments());
                    dispatch(studentActions.getLessons());
                    break;
                case ROLES.TEACHER:
                    console.log('teacher')
                    // dispatch(teacherActions.getCalendar(tenDaysBeforeNow().getTime(), new Date().getTime()));
                    dispatch(teacherActions.getLessons());
                    break;
                case ROLES.UNVERIFIED_STUDENT:
                    dispatch(unverifiedActions.getMyselfData());
                    break;
                    
                default: break;
            }
            break;

        case LOGIN:
            const loginEmail = getState().session.forms.login.email.value;
            const loginPassword = getState().session.forms.login.password.value;
            requests.login(loginEmail, loginPassword)
                .then(data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role', data.role);
                    dispatch(sessionActions.loginSuccess());
                    dispatch(sessionActions.getRoleData());
                    push('/profile');
                })
                .catch(error => {
                    dispatch(sessionActions.loginError(error))
                    fireToast( I18n.t('session.error.login.title'), I18n.t('session.error.login.description'), 'error', 'warning' );
                })
            break;
            
        case REGISTER:
            const registerEmail = getState().session.forms.register.email.value;
            const registerPassword = getState().session.forms.register.password.value;
            requests.register(registerEmail, registerPassword)
                .then(response => {
                    dispatch(sessionActions.registerSuccess(response));
                    fireToast( I18n.t('session.success.register.title'), I18n.t('session.success.register.description'), 'success', 'check' );
                    push('/login');
                })
                .catch(error => {
                    dispatch(sessionActions.registerError(error))
                    fireToast( I18n.t('session.error.register.title'), I18n.t('session.error.register.description'), 'error', 'warning' );
                })
            break;
            
        case REFRESH_TOKEN:
            requests.checkToken()
                .then(data => {
                    dispatch(sessionActions.refreshTokenSuccess(data));
                    dispatch(sessionActions.getRoleData())
                })
                .catch(error => dispatch(sessionActions.refreshTokenError(error)))
            break;
            
        case GET_PROFILE:
            requests.getProfile()
                .then(data => { dispatch(sessionActions.getProfileSuccess(data)) })
                .catch(error => { 
                    delete localStorage['token'];
                    delete localStorage['role'];
                    dispatch(sessionActions.getProfileError(error));
                    push('/login');
                })
            break;
                
        case LOGOUT:
            delete localStorage['token'];
            delete localStorage['role'];
            push('/');
            break;

        default:
            break;
    }
}

export default sessionMiddleware