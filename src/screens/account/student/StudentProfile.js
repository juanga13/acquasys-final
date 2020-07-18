import React from 'react';
import { Header } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const StudentProfile = (props) => {
    const {
        profile
    } = props;
    
    return (
        <div className='section-container'>
            <Header>{I18n.t('common.myProfile.title')}</Header>
            
            <p>{I18n.t('common.myProfile.name', profile.name)}</p>
            <p>{I18n.t('common.myProfile.surname', profile.surname)}</p>
            <p>{I18n.t('common.myProfile.email', profile.email)}</p>
            
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
