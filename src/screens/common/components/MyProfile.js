import React from 'react';
import { Header } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { ROLES } from '../../../utils/consts';

const MyProfile = (props) => {
    const role = localStorage.getItem('role');

    const renderRoleSection = () => {
        // TODO: no urgente
        switch(role) {
            case ROLES.ADMIN:
                return (
                    <div>
                        <p>{I18n.t('common.myProfile.admin.noVerifiedAccount')}</p>
                        <p>{I18n.t('common.myProfile.admin.weekLessons')}</p>
                        <p>{I18n.t('common.myProfile.admin.paymentsNotDone')}</p>
                        <p>{I18n.t('common.myProfile.admin.paymentsNext')}</p>
                    </div>
                );
            case ROLES.STUDENT:
                return (
                    <div>
                        <p>{I18n.t('common.myProfile.student.weekLessons')}</p>
                        <p>{I18n.t('common.myProfile.student.paymentsNotDone')}</p>
                        <p>{I18n.t('common.myProfile.student.paymentsNext')}</p>
                    </div>
                );
            case ROLES.TEACHER:
                return (
                    <div>
                        <p>{I18n.t('common.myProfile.teacher.weekLessons')}</p>
                    </div>
                );
            case ROLES.UNVERIFIED_STUDENT:
                return (
                    <div>
                        <p>{I18n.t('common.myProfile.unverified.verificationStatus')}</p>
                    </div>
                );

            default: return null;
        }
    };

    return (
        <div className='my-profile-container'>
            <Header>{I18n.t('common.myProfile.title')}</Header>
            <p>{I18n.t('common.myProfile.name', name)}</p>
            <p>{I18n.t('common.myProfile.surname', surname)}</p>
            <p>{I18n.t('common.myProfile.email', email)}</p>
            {renderRoleSection()}
        </div>
    )
};

export default MyProfile;
