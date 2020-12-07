export const GET_MESSAGES = 'GET_MESSAGES';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_ERROR = 'GET_MESSAGES_ERROR';

export const NEW_MESSAGE_INPUT_CHANGE = 'NEW_MESSAGE_INPUT_CHANGE';
export const NEW_MESSAGE_MODAL_STATE_CHANGE = 'NEW_MESSAGE_MODAL_STATE_CHANGE';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_ERROR = 'SEND_MESSAGE_ERROR';

export const SET_MESSAGE_READ = 'SET_MESSAGE_READ';
export const SET_MESSAGE_READ_SUCCESS = 'SET_MESSAGE_READ_SUCCESS';
export const SET_MESSAGE_READ_ERROR = 'SET_MESSAGE_READ_ERROR';


const commonActions = {
    getMessages: () => ({type: GET_MESSAGES }),
    getMessagesSuccess: (response) => ({type: GET_MESSAGES_SUCCESS, response }),
    getMessagesError: () => ({type: GET_MESSAGES_ERROR }),

    newMessageInputChange: (id, typeD, value) => ({ type: NEW_MESSAGE_INPUT_CHANGE, id, typeD, value }),
    newMessageModalStateChange: (modalState) => ({ type: NEW_MESSAGE_MODAL_STATE_CHANGE, modalState }),

    sendMessage: () => ({type: SEND_MESSAGE }),
    sendMessageSuccess: () => ({type: SEND_MESSAGE_SUCCESS }),
    sendMessageError: () => ({type: SEND_MESSAGE_ERROR }),

    setMessageRead: (id) => ({type: SET_MESSAGE_READ, id }),
    setMessageReadSuccess: () => ({type: SET_MESSAGE_READ_SUCCESS }),
    setMessageReadError: () => ({type: SET_MESSAGE_READ_ERROR }),
};

export default commonActions;