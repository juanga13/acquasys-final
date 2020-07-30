import React from 'react';
import { Header, Divider } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const StudentProfile = (props) => {
    const {
        profile
    } = props;
    
    return (
        <div className='section-container'>
            <div className='section-header-container'>
                <Header>{I18n.t('common.myProfile.title')}</Header>
            </div>
            <Divider hidden/>
            <div className='label-container'>
                <p>{I18n.t('common.myProfile.name') + ': '}</p>
                <p>{profile.name}</p>
            </div>
            <div className='label-container'>
                <p>{I18n.t('common.myProfile.name') + ': '}</p>
                <p>{profile.surname}</p>
            </div>
            <div className='label-container'>
                <p>{I18n.t('common.myProfile.email') + ': '}</p>
                <p>{profile.email}</p>
            </div>
            <Divider hidden/>
            <div>
                <p>{I18n.t('common.myProfile.student.weekLessons')}</p>
                <p>{I18n.t('common.myProfile.student.paymentsNotDone')}</p>
                <p>{I18n.t('common.myProfile.student.paymentsNext')}</p>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    profile: state.session.profile
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StudentProfile));
