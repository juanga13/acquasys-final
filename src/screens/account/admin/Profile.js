import React from 'react';
import { Header, Divider, Icon } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const AdminProfile = (props) => {
    const {
        profile,
        allStudents,
        // lessons,
        // payments
    } = props;
    /**
     * allStudents -> unverified students
     * @description se filtra para obtener todos los alumnos que faltan 
     * verificar.
     */
    const unverifiedStudents = allStudents.filter(student => !student.verified);

    /**
     * lessons -> weekLessons
     * @description se filtra para obtener todas las clases que hay esta
     * semana
     */
    // const weekDateRange = getWeekDataRange();  // [hoy, sabado]
    // const weekLessons = lessons.filter(lesson => {

    // });
    /**
     * payments -> payments not done until now (with month) AND payments 
     * to be done this month
     * @description se filtra para sacar 2 arrays.
     */
    // var todoPayments = [];
    // var nowPayments = [];
    // payments.forEach(payment => {
        
    // });
    
    return (
        <div className='section-container'>
            <div className='section-header-container'>
                <Header>{I18n.t('common.myProfile.title')}</Header>
            </div>
            <Divider/>
            <Header as='h4'>{I18n.t('common.myProfile.admin.titles.profileData')}</Header>
            <div className='label-container'>
                <p>{I18n.t('common.myProfile.name') + ': '}</p>
                <p>{profile.name}</p>
            </div>
            <div className='label-container'>
                <p>{I18n.t('common.myProfile.email') + ': '}</p>
                <p>{profile.email}</p>
            </div>
            <Divider hidden/>
            <Header as='h4'>{I18n.t('common.myProfile.admin.titles.verificationsPending')}</Header>
            {unverifiedStudents.length === 0 ? 
                <div className='label-container'>
                    <Icon color='red' name='close'/>
                    <p>{I18n.t('common.myProfile.admin.texts.noVerifiedAccount')}</p>
                </div>
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
            {/* <Divider hidden/>
            <Header as='h4'>{I18n.t('common.myProfile.admin.titles.nowLessons')}</Header>
            <p>{I18n.t('common.myProfile.admin.texts.')}</p>
            <Divider hidden/>
            <Header as='h4'>{I18n.t('common.myProfile.admin.titles.todoPayments')}</Header>
            <p>{I18n.t('common.myProfile.admin.texts.')}</p>
            <Divider hidden/>
            <Header as='h4'>{I18n.t('common.myProfile.admin.titles.nextPayments')}</Header>
            <p>{I18n.t('common.myProfile.admin.texts.')}</p> */}
        </div>
    )
};

const mapStateToProps = (state) => ({
    profile: state.session.profile,
    allStudents: state.admin.students.students,
    // lessons: state.admin.lessons.lessons,
    // payments: state.admin.payments.payments
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminProfile));
