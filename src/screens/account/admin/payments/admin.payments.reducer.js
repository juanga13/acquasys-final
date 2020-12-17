import {
    ADMIN_GET_PAYMENTS, ADMIN_GET_PAYMENTS_SUCCESS, ADMIN_GET_PAYMENTS_ERROR,
    ADMIN_PAYMENTS_INPUT_CHANGE,
    ADMIN_PAYMENTS_CHANGE_MODAL_STATE,
    ADMIN_SELECT_PAYMENT,
    CREATE_PAYMENT, CREATE_PAYMENT_SUCCESS, CREATE_PAYMENT_ERROR,
    // UPDATE_PAYMENT, UPDATE_PAYMENT_SUCCESS, UPDATE_PAYMENT_ERROR,
    // DELETE_PAYMENT, DELETE_PAYMENT_SUCCESS, DELETE_PAYMENT_ERROR,
    GET_FEE, GET_FEE_SUCCESS, GET_FEE_ERROR,
    SET_FEE, SET_FEE_SUCCESS, SET_FEE_ERROR, PAY_PAYMENT, PAY_PAYMENT_SUCCESS, PAY_PAYMENT_ERROR
} from './admin.payments.actions';
import { MODAL_STATES, REQUEST_STATUS, FIELD_TYPES } from '../../../../utils/consts';
import { dataToFormTransform } from '../../../../utils/dataFormTransform';
import { LOGOUT } from '../../../session/session.actions';
import verifyInput from '../../../../utils/verifyInput';

const initialState = {
    payments: [],
    selectedPayment: null,
    modalState: MODAL_STATES.CLOSED,
    getPaymentsStatus: REQUEST_STATUS.NONE,
    // createPaymentStatus: REQUEST_STATUS.NONE,
    // updatePaymentStatus: REQUEST_STATUS.NONE,
    // deletePaymentStatus: REQUEST_STATUS.NONE,
    fee: 0,
    getFeeStatus: REQUEST_STATUS.NONE,
    setFeeStatus: REQUEST_STATUS.NONE,
    // paymentForm: {
    //     amount: { id: 'amount', value: '', error: false, type: FIELD_TYPES.NUMBER, placeholder: 'forms.amount', label: 'forms.amount', required: true },
    //     date: { id: 'date', value: new Date().getTime(), error: false, type: FIELD_TYPES.DATE, placeholder: 'forms.date', label: 'forms.date', required: true },
    //     // en el caso de crear un payment el back me pide studentId
    //     // se pone student para que se muestre el dropdown para elegir student
    //     student: { id: 'student', value: -1, error: false, type: FIELD_TYPES.NULL, placeholder: 'forms.student', label: 'forms.student', required: true },
    // },
    payPaymentStatus: REQUEST_STATUS.NONE,
};

const adminPaymentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_GET_PAYMENTS: return { ...state, getPaymentsStatus: REQUEST_STATUS.LOADING }
        case ADMIN_GET_PAYMENTS_SUCCESS: return { ...state, getPaymentsStatus: REQUEST_STATUS.SUCCESS, payments: action.response }
        case ADMIN_GET_PAYMENTS_ERROR: return { ...state, getPaymentsStatus: REQUEST_STATUS.ERROR }

        case ADMIN_PAYMENTS_INPUT_CHANGE:
            const { id, typeD, value } = action;
            const error = !verifyInput(id, typeD, value);
            return {
                ...state,
                paymentForm: {
                    ...state.paymentForm,
                    [id]: {
                        ...state.paymentForm[id],
                        value,
                        error,
                    }
                }
            };

        case ADMIN_PAYMENTS_CHANGE_MODAL_STATE: // si pasa a edicion poblar el form con los datos del selectedLesson
            if (action.modalState === MODAL_STATES.EDIT) {
                const newPaymentForm = dataToFormTransform(state.selectedPayment, state.paymentForm);
                return { ...state, modalState: action.modalState, paymentForm: newPaymentForm };
            }
            // preview utiliza selectedLesson solo, delete utiliza data solo y create utiliza el form solo
            return { ...state, modalState: action.modalState, paymentForm: initialState.paymentForm };

        case ADMIN_SELECT_PAYMENT: return { ...state, selectedPayment: action.payment };

        case CREATE_PAYMENT: return { ...state, createPaymentStatus: REQUEST_STATUS.LOADING }
        case CREATE_PAYMENT_SUCCESS: return { ...state, createPaymentStatus: REQUEST_STATUS.SUCCESS }
        case CREATE_PAYMENT_ERROR: return { ...state, createPaymentStatus: REQUEST_STATUS.ERROR }

        // case UPDATE_PAYMENT: return { ...state, updatePaymentStatus: REQUEST_STATUS.LOADING }
        // case UPDATE_PAYMENT_SUCCESS: return { ...state, updatePaymentStatus: REQUEST_STATUS.SUCCESS }
        // case UPDATE_PAYMENT_ERROR: return { ...state, updatePaymentStatus: REQUEST_STATUS.ERROR }

        case PAY_PAYMENT: return { ...state, payPaymentStatus: REQUEST_STATUS.LOADING };
        case PAY_PAYMENT_SUCCESS: return { ...state, payPaymentStatus: REQUEST_STATUS.SUCCESS };
        case PAY_PAYMENT_ERROR: return { ...state, payPaymentStatus: REQUEST_STATUS.ERROR };
        // case DELETE_PAYMENT: return { ...state, deletePaymentStatus: REQUEST_STATUS.LOADING }
        // case DELETE_PAYMENT_SUCCESS: return { ...state, deletePaymentStatus: REQUEST_STATUS.SUCCESS }
        // case DELETE_PAYMENT_ERROR: return { ...state, deletePaymentStatus: REQUEST_STATUS.ERROR }

        case GET_FEE: return { ...state, getFeeStatus: REQUEST_STATUS.LOADING }
        case GET_FEE_SUCCESS: return { ...state, getFeeStatus: REQUEST_STATUS.SUCCESS, fee: action.response }
        case GET_FEE_ERROR: return { ...state, getFeeStatus: REQUEST_STATUS.ERROR }

        case SET_FEE: return { ...state, setFeeStatus: REQUEST_STATUS.LOADING }
        case SET_FEE_SUCCESS: return { ...state, setFeeStatus: REQUEST_STATUS.SUCCESS }
        case SET_FEE_ERROR: return { ...state, setFeeStatus: REQUEST_STATUS.ERROR }
        
        case LOGOUT: return initialState;

        
        default: return state;
    }
};

export default adminPaymentsReducer;