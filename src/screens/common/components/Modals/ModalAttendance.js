import React from 'react';
import { connect } from 'react-redux';
 
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
const ModalAttendance = (props) => {
    const {
        isOpen,
        type,
        loading,

        key,
        getAttendancesStatus,
        attendances,
        setAttendanceStatus,
        onClose,
        onBack,
        onSetAttendance,
    } = props;

    
    const handleSubmit = () => {
        // if (!Object.values(form).some(field => !verifyField(field.type, field.value))) {
        //     props.login();   
        // }
    };

    const renderForm = () => {
        switch (type) {
            case MODAL_TYPES.ADMIN_ATTENDANCES:
                return attendances?.map((value, i) => (
                    <p key={`modal-attendance-item-${i}`}>{'EDIT' + value}</p>
                ));

            case MODAL_TYPES.STUDENT_ATTENDANCES:
                return attendances?.map((value, i) => (
                    <p key={`modal-attendance-item-${i}`}>{'EDIT' + value}</p>
                ));

            case MODAL_TYPES.TEACHER_ATTENDANCES:
                return attendances?.map((value, i) => (
                    <p key={`modal-attendance-item-${i}`}>{'EDIT' + value}</p>
                ));


            default: return null;
        }
    };

    const getModalSize = () => {
        switch (type) {
            case MODAL_TYPES.ADMIN_ATTENDANCES: return 'small';
            case MODAL_TYPES.STUDENT_ATTENDANCES: return 'small';
            case MODAL_TYPES.TEACHER_ATTENDANCES: return 'small';
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
            <Modal.Header>{I18n.t('common.modals.attendances.title.' + type)}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {renderForm()}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='blue' onClick={props.onBack}><Icon name='chevron left' />{I18n.t('common.modals.attendances.buttons.goBack')}</Button>
                <Button color='green' onClick={props.onClose}><Icon name='close' />{I18n.t('common.modals.attendances.buttons.close')}</Button>
            </Modal.Actions>
        </Modal>
    );
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ModalAttendance);
