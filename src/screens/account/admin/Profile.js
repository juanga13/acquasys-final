import React from 'react';
import { Header, Label, Divider } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const AdminProfile = (props) => {
    const {
        profile,
        allStudents
    } = props;
    const unverifiedStudents = allStudents.filter(student => !student.verified); 
    console.log('unverified', allStudents, unverifiedStudents)
    return (
        <div className='section-container'>
            <div className='section-header-container'>
                <Header>{I18n.t('common.myProfile.title')}</Header>
            </div>
            <Divider/>
            <div className='label-container'>
                <p>{I18n.t('common.myProfile.name') + ': '}</p>
                <p>{profile.name}</p>
            </div>
            <div className='label-container'>
                <p>{I18n.t('common.myProfile.email') + ': '}</p>
                <p>{profile.email}</p>
            </div>
            <Divider/>
            <Header as='h4'>{I18n.t('common.myProfile.admin.verifiedAccountsTitle')}</Header>
            {unverifiedStudents.length === 0 ? 
                <p>{I18n.t('common.myProfile.admin.noVerifiedAccount')}</p>
                :
                unverifiedStudents.map(student => (
                    <p>
                        {
                            I18n.t('common.myProfile.name') + ': ' + student.name +
                            ', ' + I18n.t('common.myProfile.surname') + ': ' + student.surname + 
                            ', ' + I18n.t('common.myProfile.dni') + ': ' + student.dni
                        }
                    </p>
                ))
            }
            <Divider/>
            <p>{I18n.t('common.myProfile.admin.weekLessons')}</p>
            <Divider/>
            <p>{I18n.t('common.myProfile.admin.paymentsNotDone')}</p>
            <Divider/>
            <p>{I18n.t('common.myProfile.admin.paymentsNext')}</p>
        </div>
    )
};

const mapStateToProps = (state) => ({
    profile: state.session.profile,
    allStudents: state.admin.students.students
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminProfile));
