import {
    GET_MESSAGES, GET_MESSAGES_SUCCESS, GET_MESSAGES_ERROR,
    SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_ERROR,
    SET_MESSAGE_READ, SET_MESSAGE_READ_SUCCESS, SET_MESSAGE_READ_ERROR, NEW_MESSAGE_INPUT_CHANGE, NEW_MESSAGE_MODAL_STATE_CHANGE
} from './common.actions';
import { REQUEST_STATUS, FIELD_TYPES, MODAL_STATES } from '../../utils/consts';
import { LOGOUT } from '../session/session.actions';
import verifyInput from '../../utils/verifyInput';


const initialState = {
    modalState: MODAL_STATES.CLOSED,
    messages: [],
    getMessagesStatus: REQUEST_STATUS.NONE,
    newMessageForm: {
        subject:  {id: 'subject',  value: '', error: false, type: FIELD_TYPES.STRING, placeholder: 'forms.subject', label: 'forms.subject', required: false },
        to:       {id: 'to',       value: '', error: false, type: FIELD_TYPES.EMAIL, placeholder: 'forms.to', label: 'forms.to', required: true },
        contents: {id: 'contents', value: '', error: false, type: FIELD_TYPES.TEXT_AREA, placeholder: 'forms.content', label: 'forms.content', required: true },
    },
    sendMessageStatus: REQUEST_STATUS.NONE,
    setReadMessageStatus: REQUEST_STATUS.NONE,
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES: return { ...state, getMessagesStatus: REQUEST_STATUS.LOADING }
        case GET_MESSAGES_SUCCESS: return { ...state, getMessagesStatus: REQUEST_STATUS.SUCCESS, messages: action.response }
        case GET_MESSAGES_ERROR: return { ...state, getMessagesStatus: REQUEST_STATUS.ERROR }
        
        case NEW_MESSAGE_INPUT_CHANGE: 
            const { id, typeD, value } = action;
            const error = !verifyInput(id, typeD, value);
            return {
                ...state,
                newMessageForm: {
                    ...state.newMessageForm,
                    [id]: {
                        ...state.newMessageForm[id],
                        value,
                        error
                    }
                }
            };
        case NEW_MESSAGE_MODAL_STATE_CHANGE: return { ...state, modalState: action.modalState };

        case SEND_MESSAGE: return { ...state, sendMessageStatus: REQUEST_STATUS.LOADING }
        case SEND_MESSAGE_SUCCESS: return { ...state, sendMessageStatus: REQUEST_STATUS.SUCCESS, newMessageForm: initialState.newMessageForm };
        case SEND_MESSAGE_ERROR: return { ...state, sendMessageStatus: REQUEST_STATUS.ERROR }
        
        case SET_MESSAGE_READ: return { ...state, setReadMessageStatus: REQUEST_STATUS.LOADING }
        case SET_MESSAGE_READ_SUCCESS: return { ...state, setReadMessageStatus: REQUEST_STATUS.SUCCESS }
        case SET_MESSAGE_READ_ERROR: return { ...state, setReadMessageStatus: REQUEST_STATUS.ERROR }
        
        case LOGOUT: return initialState;


        default: return state;
    }
};

export default commonReducer;