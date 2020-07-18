import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, Dimmer, Loader, Button, Label } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { REQUEST_STATUS } from '../../../../utils/consts';
import fireToast from '../Toaster';

/**
 * @param { boolean } isOpen -> 
 * @param { enum } type -> students/teachers/lessons/payments
 * @param { object } data -> of selected student/teacher/lesson/payment to delete
 * @param { function } onClose()
 * @param { function } onClose -> action to close this modal to parent
 * @param { function} onSubmit -> action to confirm deletion to parent (ie student with data {asd} will be prompted to deletion)
 */
const ModalDelete = (props) => {
    const {
        isOpen,
        type,
        data,
        loading,
        status
    } = props;

    return (
        <Modal size='tiny' open={isOpen} onClose={props.onClose}>
            <Dimmer active={loading} inverted><Loader /></Dimmer>
            <Modal.Header>{I18n.t('common.modals.delete.title.' + type, { ...data })}</Modal.Header>
            <Modal.Content>
                <div>
                    {status === REQUEST_STATUS.ERROR && <Label color='red'>{I18n.t('common.modals.delete.error.' + type)}</Label>}
                    {status === REQUEST_STATUS.SUCCESS && <Label color='green'>{I18n.t('common.modals.delete.success.' + type)}</Label>}
                </div>
                <p>{I18n.t('common.modals.delete.prompt.' + type, { ...data })}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative icon='close' onClick={props.onClose} />
                <Button positive icon='checkmark' onClick={props.onSubmit} />
            </Modal.Actions>
        </Modal>
    );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalDelete));
