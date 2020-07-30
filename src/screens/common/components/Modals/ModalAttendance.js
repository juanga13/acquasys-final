import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, Form, Image, Button, Icon, Loader, Dimmer, Label } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { dummyAvatar } from '../../../../assets';
import { MODAL_TYPES, REQUEST_STATUS } from '../../../../utils/consts';
import MyFormInput from '../MyFormInput';

/**
 * 
 * @param {object} props:
 * key
 * isOpen
 * type
 * getAttendancesStatus
 * attendances
 * setAttendanceStatus
 * onClose
 * onBack
 * onSetAttendance
 */
const ModalEdit = (props) => {
    const {
        isOpen,
        type,
        form,
        showImage,
        loading
    } = props;

    // const formKeys = form ? Object.keys(form) : [];
    const formValues = form ? Object.values(form) : [];
    
    const handleSubmit = () => {
        // if (!Object.values(form).some(field => !verifyField(field.type, field.value))) {
        //     props.login();   
        // }
    };

    const renderForm = () => {
        switch (type) {
            case MODAL_TYPES.TEACHER_ASSISTANCES:
                return formValues.map((value, i) => (
                    <p>{'EDIT' + value}</p>
                ));

            case MODAL_TYPES.TEACHER_ASSISTANCES:
                return formValues.map((value, i) => (
                    <p>{'EDIT' + value}</p>
                ));


            default: return null;
        }
    };

    const getModalSize = () => {
        switch (type) {
            case MODAL_TYPES.TEACHER_ASSISTANCES: return 'small';
            case MODAL_TYPES.TEACHER_ASSISTANCES: return 'small';
            default: return 'small';
        }
    }

    return (
        <Modal
            size={getModalSize()}
            open={isOpen}
            onClose={props.onClose}
        >
            <Dimmer active={loading} inverted><Loader /></Dimmer>
            <Modal.Header>{I18n.t('common.modals.edit.title.' + type)}</Modal.Header>
            <Modal.Content image>
                {showImage && <Image wrapped size='small' src={dummyAvatar} />}
                <Modal.Description>
                    {renderForm()}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={props.onSubmit}><Icon name='check' />{I18n.t('common.modals.edit.buttons.submit')}</Button>
                <Button color='red' onClick={props.onClose}><Icon name='close' />{I18n.t('common.modals.edit.buttons.cancel')}</Button>
                <Button color='blue' onClick={props.onCancel}><Icon name='chevron left' />{I18n.t('common.modals.edit.buttons.goBack')}</Button>
            </Modal.Actions>
        </Modal>
    );
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalEdit));
