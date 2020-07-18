/* Constants */
export const GET_PAYMENTS = 'GET_PAYMENTS';
export const GET_PAYMENTS_SUCCESS = 'GET_PAYMENTS_SUCCESS';
export const GET_PAYMENTS_ERROR = 'GET_PAYMENTS_ERROR';

export const ADMIN_PAYMENTS_INPUT_CHANGE = 'ADMIN_PAYMENTS_INPUT_CHANGE';
export const ADMIN_PAYMENTS_CHANGE_MODAL_STATE = 'ADMIN_PAYMENTS_CHANGE_MODAL_STATE';
export const SELECT_PAYMENT = 'SELECT_PAYMENT';

export const CREATE_PAYMENT = 'CREATE_PAYMENT';
export const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_ERROR = 'CREATE_PAYMENT_ERROR';

// export const UPDATE_PAYMENT = 'UPDATE_PAYMENT';
// export const UPDATE_PAYMENT_SUCCESS = 'UPDATE_PAYMENT_SUCCESS';
// export const UPDATE_PAYMENT_ERROR = 'UPDATE_PAYMENT_ERROR';

// export const DELETE_PAYMENT = 'DELETE_PAYMENT';
// export const DELETE_PAYMENT_SUCCESS = 'DELETE_PAYMENT_SUCCESS';
// export const DELETE_PAYMENT_ERROR = 'DELETE_PAYMENT_ERROR';

export const GET_FEE = 'GET_FEE';
export const GET_FEE_SUCCESS = 'GET_FEE_SUCCESS';
export const GET_FEE_ERROR = 'GET_FEE_ERROR';

export const SET_FEE = 'SET_FEE';
export const SET_FEE_SUCCESS = 'SET_FEE_SUCCESS';
export const SET_FEE_ERROR = 'SET_FEE_ERROR';

/* Definitions */
const adminPaymentsActions = {
    getPayments: () => ({ type: GET_PAYMENTS }),
    getPaymentsSuccess: (response) => ({ type: GET_PAYMENTS_SUCCESS, response }),
    getPaymentsError: () => ({ type: GET_PAYMENTS_ERROR }),

    adminPaymentsInputChange: (id, value) => ({ type: ADMIN_PAYMENTS_INPUT_CHANGE, id, value }),
    adminPaymentsChangeModalState: (modalState) => ({ type: ADMIN_PAYMENTS_CHANGE_MODAL_STATE, modalState }),
    selectPayment: (payment) => ({ type: SELECT_PAYMENT, payment }),

    createPayment: (data) => ({ type: CREATE_PAYMENT, data }),
    createPaymentSuccess: () => ({ type: CREATE_PAYMENT_SUCCESS }),
    createPaymentError: () => ({ type: CREATE_PAYMENT }),

    // updatePayment: (data) => ({ type: UPDATE_PAYMENT, data }),
    // updatePaymentSuccess: () => ({ type: UPDATE_PAYMENT_SUCCESS }),
    // updatePaymentError: () => ({ type: UPDATE_PAYMENT }),

    // deletePayment: (id) => ({ type: DELETE_PAYMENT, id }),
    // deletePaymentSuccess: () => ({ type: DELETE_PAYMENT_SUCCESS }),
    // deletePaymentError: () => ({ type: DELETE_PAYMENT }),

    getFee: () => ({ type: GET_FEE }),
    getFeeSuccess: (response) => ({ type: GET_FEE_SUCCESS, response }),
    getFeeError: () => ({ type: GET_FEE_ERROR }),

    setFee: (value) => ({ type: SET_FEE, value }),
    setFeeSuccess: () => ({ type: SET_FEE_SUCCESS }),
    setFeeError: () => ({ type: SET_FEE_ERROR })
};

export default adminPaymentsActions;