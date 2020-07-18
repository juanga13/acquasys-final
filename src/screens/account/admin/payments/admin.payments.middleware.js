import adminPaymentsActions, { 
    GET_PAYMENTS, 
    // UPDATE_PAYMENT, 
    // DELETE_PAYMENT, 
    ADMIN_PAYMENTS_CHANGE_MODAL_STATE, 
    CREATE_PAYMENT,
    GET_FEE,
    SET_FEE
} from './admin.payments.actions';
import requests from './admin.payments.services';
import { MODAL_STATES } from '../../../../utils/consts';
import { formToDataTransform } from '../../../../utils/dataFormTransform';

const adminPaymentsMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);
    switch (action.type) {
        case GET_PAYMENTS:
            requests.getPayments()
                .then(response => {
                    // fix for MyTable getting the correct data from the beginning
                    let data = [];
                    /*
                        amount: 2000
                        date: "2020-06-02T03:00:00.000+0000"
                        payed: false
                        student: {id: 429, email: "Marcos543@student.com", password: "$2a$10$t68SxBU5MMCFEEspR10v4eqGdXc4Cz.yxWNkJhLuupaBefS1kHnL.", name: "Marcos", surname: "Fernandez", …}
                    */
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
            action.modalState === MODAL_STATES.CLOSED && dispatch(adminPaymentsActions.selectPayment(null))
            break;

        case CREATE_PAYMENT:
            const createPaymentForm = getState().admin.payments.paymentForm;
            let createData = formToDataTransform(createPaymentForm);
            // take missing data (not shown in form) and add it in order to make the request
            // take data from getState().selectedLesson and insert it into data!
            requests.createPayment(createData)
                .then(() => {
                    dispatch(adminPaymentsActions.createPaymentSuccess());
                    dispatch(adminPaymentsActions.getPayments())
                })
                .catch(() => dispatch(adminPaymentsActions.createPaymentError()));
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