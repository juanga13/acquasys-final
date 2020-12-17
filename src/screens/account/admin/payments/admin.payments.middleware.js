import adminPaymentsActions, { 
    ADMIN_GET_PAYMENTS, 
    // UPDATE_PAYMENT, 
    // DELETE_PAYMENT, 
    ADMIN_PAYMENTS_CHANGE_MODAL_STATE, 
    CREATE_PAYMENT,
    GET_FEE,
    PAY_PAYMENT,
    SET_FEE
} from './admin.payments.actions';
import requests from './admin.payments.services';
import { MODAL_STATES } from '../../../../utils/consts';
import { formToDataTransform } from '../../../../utils/dataFormTransform';
import fireToast from '../../../common/components/Toaster';
import { I18n } from 'react-redux-i18n';


const adminPaymentsMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);
    switch (action.type) {
        case ADMIN_GET_PAYMENTS:
            requests.getPayments()
                .then(response => {
                    // fix for MyTable getting the correct data from the beginning
                    let data = [];
                    Object.keys(response).forEach(key => {
                        const item = response[key];   
                        data.push({
                            amount: item.amount,
                            date: item.date,
                            payed: item.payed,
                            name: item.student.name,
                            surname: item.student.surname,
                            dni: item.student.dni,
                            student: item.student
                        })
                    });
                    dispatch(adminPaymentsActions.getPaymentsSuccess(data));
                })
                .catch(() => dispatch(adminPaymentsActions.getPaymentsError()));
            break;

        case ADMIN_PAYMENTS_CHANGE_MODAL_STATE:
            action.modalState === MODAL_STATES.CLOSED && dispatch(adminPaymentsActions.selectPayment(null));
            break;

        case CREATE_PAYMENT:
            const createPaymentForm = getState().admin.payments.paymentForm;
            let createData = formToDataTransform(createPaymentForm);
            // take missing data (not shown in form) and add it in order to make the request
            // take data from getState().selectedLesson and insert it into data!

            // en el caso de crear un payment el back me pide studentId
            // se cambia student a studentId
            createData.studentId = createData.student;
            delete createData.student;

            requests.createPayment(createData)
                .then(() => {
                    dispatch(adminPaymentsActions.createPaymentSuccess());
                    fireToast(I18n.t('admin.payments.success.create.title'), I18n.t('admin.payments.success.create.description'), 'success', 'check');
                    dispatch(adminPaymentsActions.getPayments());
                })
                .catch(() => {
                    dispatch(adminPaymentsActions.createPaymentError());
                    fireToast(I18n.t('admin.payments.error.create.title'), I18n.t('admin.payments.error.create.description'), 'error', 'warning');
                });
            break;

        case PAY_PAYMENT:
            requests.payPayment(action.payment)
                .then((response) => {
                    dispatch(adminPaymentsActions.payPaymentSuccess());
                    dispatch(adminPaymentsActions.getPayments())
                })
                .catch((error) => {
                    dispatch(adminPaymentsActions.payPaymentError())
                    fireToast('Pagos', 'Hubo un error al marcar como pago', 'error', 'warning');
                });
            break;

        // case UPDATE_PAYMENT:
        //     let updateData = formToDataTransform(getState().admin.payments.paymentForm);
        //     // take missing data (not shown in form) and add it in order to make the request
        //     // take data from getState().selectedLesson and insert it into data!
        //     requests.updatePay(updateData)
        //         .then(() => {
        //             dispatch(adminPaymentsActions.updateLessonSuccess());
        //             dispatch(adminPaymentsActions.getLessons())
        //         })
        //         .catch(() => dispatch(adminPaymentsActions.updateLessonError()));
        //     break;

        // case DELETE_PAYMENT:
        //     requests.deleteLesson(action.id)
        //         .then(() => {
        //             dispatch(adminPaymentsActions.deleteLessonSuccess());
        //             dispatch(adminPaymentsActions.selectLesson(null));
        //             dispatch(adminPaymentsActions.getLessons());
        //         })
        //         .catch(() => dispatch(adminPaymentsActions.deleteLessonError()));
        //     break;

        case GET_FEE:
            requests.getPaymentFee()
                .then(response => dispatch(adminPaymentsActions.getFeeSuccess(response)))
                .catch(() => dispatch(adminPaymentsActions.getFeeError()));
            break;

        case SET_FEE:
            requests.setPaymentFee(action.value)
                .then(response => {
                    dispatch(adminPaymentsActions.setFeeSuccess(response));
                    dispatch(adminPaymentsActions.getFee())
                })
                .catch(() => dispatch(adminPaymentsActions.setFeeError()));
            break;


        default: break;
    }
};

export default adminPaymentsMiddleware;