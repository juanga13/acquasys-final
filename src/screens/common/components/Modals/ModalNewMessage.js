import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, Form, Button, Icon } from 'semantic-ui-react';
import MyFormInput from '../MyFormInput';
import { I18n } from 'react-redux-i18n';

/**
 * 
 * @param { Object } props:
 * - isOpen -> is this modal showing
 * - form -> object with all field and its info to 
 * render as inputs
 * - loading
 * - onClose -> close callback
 */
const ModalNewMessage = (props) => {
    const {
        isOpen,
        form,
        loading
    } = props;
    const formValues = form ? Object.values(form) : [];

    const renderForm = () => {
        return (
            <Form>
                {formValues.map((valueProps) => (
                    <Form.Field required={valueProps.required} className='field-container' key={'modal-new-message-form-field-' + valueProps.id} >
                        <label>{I18n.t(valueProps.label) + ':'}</label>
                        <MyFormInput {...valueProps} onChange={(id, value) => props.onChange(id, value)} />
                    </Form.Field>
                ))}
            </Form>
        );
    };
    
    return (
        <Modal
            size='small'
            open={isOpen}
            onClose={props.onCancel}
            loading={loading}
        >
            <Modal.Header>{I18n.t('common.modals.newMessage.title')}</Modal.Header>
            <Modal.Content>
                <Modal.Description fluid>
                    {renderForm()}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='grey' onClick={props.onCancel}><Icon name='close' />{I18n.t('common.modals.newMessage.buttons.cancel')}</Button>
                <Button color='blue' onClick={props.onSend}><Icon name='check' />{I18n.t('common.modals.newMessage.buttons.send')}</Button>
            </Modal.Actions>
        </Modal>
    );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalNewMessage));