import React from 'react';
import { Header, Divider, Icon, Card, Image, Button, Label } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { dummyAvatar } from '../../../assets';
import { MODAL_STATES, MODAL_TYPES } from '../../../utils/consts';
import { ModalEdit, ModalPreview } from '../../common/components/Modals';

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
            <div className='section-content-container'>
                <div className='profile-image-data-container'>
                    <Image src={
                        // myData.avatarUrl ||
                        dummyAvatar} size='small' circular />
                    <div className='profile-data-container'>
                        <Card fluid>
                            <Card.Content textAlign='right'>
                                <Card.Header>{`${profile.name} ${profile.surname}`}</Card.Header>
                                <Card.Meta>{I18n.t('admin.profile.meta')}</Card.Meta>
                                <Card.Description>{profile.email}</Card.Description>
                            </Card.Content>
                        </Card>
                    </div>
                </div>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{I18n.t('common.myProfile.admin.titles.verificationsPending')}</Card.Header>
                    </Card.Content>
                    <Card.Content>
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
                    </Card.Content>
                </Card>
                <Card  fluid>
                    <Card.Content>
                        <Card.Header>{I18n.t('admin.profile.lessons.header')}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        
                    </Card.Content>
                </Card>
                <Card  fluid>
                    <Card.Content>
                        <Card.Header>{I18n.t('admin.profile.payments.header')}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        
                    </Card.Content>
                </Card>
                <Card  fluid>
                    <Card.Content>
                        <Card.Header>{I18n.t('admin.profile.payments.next.header')}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        
                    </Card.Content>
                </Card>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    profile: state.session.profile,
    allStudents: state.admin.students.students,
    lessons: state.admin.lessons.lessons,
    payments: state.admin.payments.payments,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);
