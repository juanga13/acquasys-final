/* Constants */
export const GET_ALL_DATA = 'GET_ALL_DATA';
export const GET_ALL_DATA_SUCCESS = 'GET_ALL_DATA_SUCCESS';
export const GET_ALL_DATA_ERROR = 'GET_ALL_DATA_ERROR';

/* Definitions */
const adminActions = {
    getAllData: () => ({type: GET_ALL_DATA}),
    getAllDataSuccess: () => ({type: GET_ALL_DATA_SUCCESS}),
    getAllDataError: () => ({type: GET_ALL_DATA_ERROR})
};

export default adminActions;