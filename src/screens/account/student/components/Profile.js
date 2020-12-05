import React from 'react';
import { Header, Divider, Card, Button, Icon, Label, Image } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { ModalEdit, ModalPreview } from '../../../common/components/Modals';
import { MODAL_STATES, MODAL_TYPES } from '../../../../utils/consts';
import studentActions from '../student.actions';
import { dummyAvatar } from '../../../../assets';

const StudentProfile = (props) => {
    const {
        profile,
        myData,
        modalState,
        form,
        updateMyDataStatus,
    } = props;
    
    return (
        <div className='section-container'>
            <ModalEdit
                key='modal-edit'
                isOpen={modalState === MODAL_STATES.EDIT}
                type={MODAL_TYPES.ADMIN_STUDENT}
                form={form}
                status={updateMyDataStatus}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onVerify={(id) => props.verifyStudent(id)}
                onChange={(id, type, value) => props.inputChange(id, type, value)}
                onCancel={() => props.changeModalState(MODAL_STATES.PREVIEW)}
                onSubmit={() => props.updateMyData()}
                showImage
            />
            <ModalPreview
                key='modal-preview'
                isOpen={modalState === MODAL_STATES.PREVIEW}
                type={MODAL_TYPES.ADMIN_STUDENT}
                data={myData}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onEdit={() => props.changeModalState(MODAL_STATES.EDIT)}
                showImage
            />
            <div className='section-header-container'>
                <Header>{I18n.t('common.myProfile.title')}</Header>
            </div>
            <Divider hidden/>
            <div className='section-content-container'>
                <div className='profile-cards-container'>
                    <Card>
                        <Image src={myData.avatarUrl || dummyAvatar} size='medium' circular />
                        <Card.Content>
                            <Card.Header>{`${profile.name} ${profile.surname}`}</Card.Header>
                            <Card.Meta>{I18n.t('student.profile.meta')}</Card.Meta>
                            <Card.Description>{profile.email}</Card.Description>
                        </Card.Content>
                        <Card.Content>
                            <Button as='div' labelPosition='right' fluid>
                                <Button color='blue' fluid>
                                    <Icon name='eye' />
                                    Mis datos
                                </Button>
                                <Label as='a' basic color={myData.verified ? 'green' : 'red'} pointing='left'>
                                    {myData.verified ? `Verificado` : 'No verificado'}
                                </Label>
                            </Button>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header>{I18n.t('student.profile.settings.header')}</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            
                        </Card.Content>
                    </Card>
                </div>
                <Divider hidden/>
                <div>
                    <p>{I18n.t('common.myProfile.student.weekLessons')}</p>
                    <p>{I18n.t('common.myProfile.student.paymentsNotDone')}</p>
                    <p>{I18n.t('common.myProfile.student.paymentsNext')}</p>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    profile: state.session.profile,
    modalState: state.student.modalState,
    myData: state.student.myData,
    form: state.student.form,
    updateMyDataStatus: state.student.updateMyDataStatus, 
});

const mapDispatchToProps = (dispatch) => ({
    updateMyData: () => dispatch(studentActions.updateMyDataRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
