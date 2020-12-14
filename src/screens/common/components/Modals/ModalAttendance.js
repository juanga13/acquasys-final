import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Icon, Loader, Dimmer } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { MODAL_TYPES, REQUEST_STATUS } from '../../../../utils/consts';
import AttendanceTable from '../AttendanceTable/AttendanceTable';


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
        key,
        isOpen,
        type,
        getAttendancesStatus,
        attendances,
        setAttendanceStatus,
        // onBack, function
        // onClose, function
        // onSetAttendance, function
        lessonId,
        loading,
    } = props;

    const renderForm = () => {
        switch (type) {
            case MODAL_TYPES.ADMIN_ATTENDANCES:
                return (
                    <AttendanceTable
                        attendances={attendances} lessonId={lessonId}
                        loading={getAttendancesStatus === REQUEST_STATUS.LOADING || setAttendanceStatus === REQUEST_STATUS.LOADING}
                        error={getAttendancesStatus === REQUEST_STATUS.ERROR}
                        onSetAttendance={props.onSetAttendance}
                    />
                );

            case MODAL_TYPES.STUDENT_ATTENDANCES:
                return (
                    <AttendanceTable
                        attendances={attendances} lessonId={lessonId}
                        loading={getAttendancesStatus === REQUEST_STATUS.LOADING || setAttendanceStatus === REQUEST_STATUS.LOADING}
                        error={getAttendancesStatus === REQUEST_STATUS.ERROR}
                        previewMode
                    />
                );

            case MODAL_TYPES.TEACHER_ATTENDANCES:
                return (
                    <AttendanceTable
                        attendances={attendances} lessonId={lessonId}
                        loading={getAttendancesStatus === REQUEST_STATUS.LOADING || setAttendanceStatus === REQUEST_STATUS.LOADING}
                        error={getAttendancesStatus === REQUEST_STATUS.ERROR}
                        onSetAttendance={props.onSetAttendance}
                    />
                );


            default: return null;
        }
    };

    return (
        <Modal
            size='fullscreen'
            open={isOpen} key={key}
            onClose={props.onClose}
        >
            <Dimmer active={getAttendancesStatus === REQUEST_STATUS.LOADING || setAttendanceStatus === REQUEST_STATUS.LOADING } inverted><Loader /></Dimmer>
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
