import { I18n } from 'react-redux-i18n';
import { formToDataTransform } from '../../../utils/dataFormTransform';
import fireToast from '../../common/components/Toaster';
import unverifiedActions, {
    COMPLETE_MY_DATA,
} from './unverified.actions';
import requests from './unverified.services';

const unverifiedMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case COMPLETE_MY_DATA:
            const formData = getState().unverified.form;
            const myData = getState().unverified.myData;
            let newData = formToDataTransform(formData);
            newData.avatarUrl = myData.avatarUrl || null;
            newData.complete = true;
            newData.id = myData.id;
            newData.role = myData.role;
            // console.log('form data', formData, 'myData', myData, 'newData', newData);
            requests.completeMyData(newData)
                .then((response) => {
                    dispatch(unverifiedActions.completeMyDataSuccess(response));
                    fireToast(I18n.t('unverified.profile.success.update.title'), I18n.t('unverified.profile.success.update.description'), 'success', 'check ');
                })
                .catch((error) => {
                    dispatch(unverifiedActions.completeMyDataError(error));
                    fireToast(I18n.t('unverified.profile.error.update.title'), I18n.t('unverified.profile.error.update.description'), 'error', 'warning');
                });
            break;

        default: break;
    }
};

export default unverifiedMiddleware;