import commonActions, {
    GET_MESSAGES,
    SEND_MESSAGE,
    SET_MESSAGE_READ
} from './common.actions';
import requests from './common.services';
import { formToDataTransform } from '../../utils/dataFormTransform';
import fireToast from './components/Toaster';
import { I18n } from 'react-redux-i18n';
import { MODAL_STATES } from '../../utils/consts';


const commonMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case GET_MESSAGES:
            requests.getMessages()
                .then(response => dispatch(commonActions.getMessagesSuccess(response)))
                .catch(() => dispatch(commonActions.getMessagesError()))
            break;

        case SEND_MESSAGE:
            const newMessageForm = getState().common.newMessageForm;
            let data = formToDataTransform(newMessageForm);
            requests.sendMessage(data)
                .then(() => {
                    dispatch(commonActions.sendMessageSuccess());
                    fireToast(I18n.t('common.messaging.success.send.title'), I18n.t('common.messaging.success.send.description'), 'success', 'check');
                    dispatch(commonActions.newMessageModalStateChange(MODAL_STATES.CLOSED));
                    dispatch(commonActions.getMessages());
                })
                .catch(() => {
                    dispatch(commonActions.sendMessageError())
                    fireToast(I18n.t('common.messaging.error.send.title'), I18n.t('common.messaging.error.send.description'), 'error', 'warning');
                });
                break;

        case SET_MESSAGE_READ:
            requests.setMessageRead(action.id)
                .then(() => {
                    dispatch(commonActions.setMessageReadSuccess());
                    dispatch(commonActions.getMessages());
                })
                .catch(() => dispatch(commonActions.setMessageReadError()))
            break;


        default: break;
    }
};

export default commonMiddleware;