/* Constants */
export const GET_MYSELF_DATA = 'GET_MYSELF_DATA';
export const GET_MYSELF_DATA_SUCCESS = 'GET_MYSELF_DATA_SUCCESS';
export const GET_MYSELF_DATA_ERROR = 'GET_MYSELF_DATA_ERROR';

export const COMPLETE_MY_DATA = 'COMPLETE_MY_DATA';
export const COMPLETE_MY_DATA_SUCCESS = 'COMPLETE_MY_DATA_SUCCESS';
export const COMPLETE_MY_DATA_ERROR = 'COMPLETE_MY_DATA_ERROR';

export const UNVERIFIED_CHANGE_MODAL_STATE = 'UNVERIFIED_CHANGE_MODAL_STATE';
export const UNVERIFIED_INPUT_CHANGE = 'UNVERIFIED_INPUT_CHANGE';

/* Definitions */
const unverifiedActions = {
    completeMyData: () => ({type: COMPLETE_MY_DATA}),
    completeMyDataSuccess: (response) => ({type: COMPLETE_MY_DATA_SUCCESS, response}),
    completeMyDataError: (error) => ({type: COMPLETE_MY_DATA_ERROR, error}),

    getMyselfData: () => ({type: GET_MYSELF_DATA}),
    getMyselfDataSuccess: (response) => ({type: GET_MYSELF_DATA_SUCCESS, response}),
    getMyselfDataError: (error) => ({type: GET_MYSELF_DATA_ERROR, error}),

    unverifiedChangeModalState: (modalState) => ({type: UNVERIFIED_CHANGE_MODAL_STATE, modalState}),
    unverifiedInputChange: (id, typeD, value) => ({type: UNVERIFIED_INPUT_CHANGE, id, typeD, value}),
};

export default unverifiedActions;