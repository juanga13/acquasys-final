import commonActions, {
    GET_MESSAGES,
    SEND_MESSAGE,
    SET_MESSAGE_READ
} from './common.actions';
import requests from './common.services';
import { formToDataTransform } from '../../utils/dataFormTransform';


const commonMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case GET_MESSAGES:
            requests.getMessages()
                .then(response => dispatch(commonActions.getMessagesSuccess(response)))
                .catch(() => dispatch(commonActions.getMessagesError()))
            break;

        case SEND_MESSAGE:
            const messageForm = getState().common.messageForm;
            let data = formToDataTransform(messageForm);
            requests.sendMessage(data)
                .then(() => {
                    dispatch(commonActions.sendMessageSuccess());
                    dispatch(commonActions.getMessages());
                })
                .catch(() => dispatch(commonActions.sendMessageError()))
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