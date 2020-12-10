import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Header, Divider, Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import unverifiedActions from '../unverified.actions';
import {ModalEdit, ModalPreview} from '../../../common/components/Modals';
import { MODAL_STATES, MODAL_TYPES, REQUEST_STATUS } from '../../../../utils/consts';
import { dummyAvatar } from '../../../../assets';


const Profile = (props) => {
    const {
        profile,
        myData,
        completeMyDataStatus,
        getMyselfDataStatus,
        modalState,
        form,
        updateMyDataStatus,
    } = props;

    return (
        <div className='section-container'>
            <ModalEdit
                key='modal-edit'
                isOpen={modalState === MODAL_STATES.EDIT}
                type={MODAL_TYPES.UNVERIFIED_PROFILE}
                form={form}
                status={updateMyDataStatus}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onChange={(id, type, value) => props.inputChange(id, type, value)}
                onCancel={() => props.changeModalState(MODAL_STATES.PREVIEW)}
                onSubmit={() => props.completeMyData()}
                showImage
                loading={getMyselfDataStatus === REQUEST_STATUS.LOADING || completeMyDataStatus === REQUEST_STATUS.LOADING}
            />
            <ModalPreview
                key='modal-preview'
                isOpen={modalState === MODAL_STATES.PREVIEW}
                type={MODAL_TYPES.UNVERIFIED_PROFILE}
                data={myData}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onEdit={() => props.changeModalState(MODAL_STATES.EDIT)}
                showImage
                loading={getMyselfDataStatus === REQUEST_STATUS.LOADING}
            />
            <div className='section-header-container'>
                <Header>{I18n.t('common.myProfile.title')}</Header>
            </div>
            <Divider hidden/>
            <div className='section-content-container'>
                <div className='profile-image-data-container'>
                    <Image src={myData.avatarUrl || dummyAvatar} size='small' circular />
                    <div className='profile-data-container'>
                        <Card fluid>
                            <Card.Content textAlign='right'>
                                <Card.Header>{I18n.t('unverified.profile.title')}</Card.Header>
                                <Card.Description>{profile.email}</Card.Description>
                            </Card.Content>
                            <Card.Content textAlign='right'>
                                <Button as='div' labelPosition='right'>
                                    <Button color='blue'  onClick={() => props.changeModalState(MODAL_STATES.PREVIEW)}>
                                        <Icon name='eye' />
                                        {I18n.t('student.profile.myData')}
                                    </Button>
                                    {myData.complete ?
                                        <Label basic color={'yellow'} pointing='left'>
                                            {I18n.t('unverified.profile.verificationPending')}
                                        </Label>
                                        :
                                        <Label basic color={'red'} pointing='left'>
                                            {I18n.t('unverified.profile.notVerified')}
                                        </Label>
                                    }
                                </Button>
                            </Card.Content>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    profile: state.session.profile,
    myData: state.unverified.myData,
    completeMyDataStatus: state.unverified.completeMyDataStatus,
    getMyselfDataStatus: state.unverified.getMyselfDataStatus,
    modalState: state.unverified.modalState,
    form: state.unverified.form,
    updateMyDataStatus: state.unverified.updateMyDataStatus,
});

const mapDispatchToProps = (dispatch) => ({
    changeModalState: (modalState) => dispatch(unverifiedActions.unverifiedChangeModalState(modalState)),
    completeMyData: () => dispatch(unverifiedActions.completeMyData()),
    inputChange: (id, type, value) => dispatch(unverifiedActions.unverifiedInputChange(id, type, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
