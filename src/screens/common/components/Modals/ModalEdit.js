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
 * - loading -> boolean
 * - isOpen -> boolean
 * - onClose -> action to close
 * - onSubmit -> action to submit new data
 * - onPreview -> action to cancel edition and go (back) to preview modal satat
 * - onVerify -> ONLY STUDENT FROM ADMIN action to verify student if is not verified
 * - data -> data to render in inputs
 * - type -> enum modal types in consts
 */
const ModalEdit = (props) => {
    const {
        isOpen,
        loading,
        type,
        form,
        showImage,
        status
    } = props;

    // const formKeys = form ? Object.keys(form) : [];
    const formValues = form ? Object.values(form) : [];
    console.log('askjasdjk', formValues);

    const handleSubmit = () => {
        // if (!Object.values(form).some(field => !verifyField(field.type, field.value))) {
        //     props.login();   
        // }
    };

    const renderForm = () => {
        switch (type) {
            case MODAL_TYPES.ADMIN_STUDENT:
                return (
                    <Form onSubmit={handleSubmit}>
                        {formValues.map((valueProps) => (
                            <Form.Field className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                <p>{I18n.t(valueProps.label) + ':'}</p>
                                <MyFormInput {...valueProps} onChange={(id, value) => props.onChange(id, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.ADMIN_TEACHER:
                return (
                    <Form onSubmit={handleSubmit}>
                        {formValues.map((valueProps) => (
                            <Form.Field className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                <p>{I18n.t(valueProps.label) + ':'}</p>
                                <MyFormInput {...valueProps} onChange={(id, value) => props.onChange(id, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.ADMIN_LESSON:
                return (
                    <Form onSubmit={handleSubmit}>
                        {formValues.map((valueProps) => {
                            return (
                                <Form.Field className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                    <p>{I18n.t(valueProps.label) + ':'}</p>
                                    <MyFormInput
                                        {...valueProps}
                                        students={valueProps.id === 'students' && props.students}
                                        teachers={valueProps.id === 'teachers' && props.teachers}
                                        onChange={(id, value) => props.onChange(id, value)}
                                    />
                                </Form.Field>
                            );
                        })}
                    </Form>
                );

            case MODAL_TYPES.ADMIN_PAYMENT:
                return (
                    <Form onSubmit={handleSubmit}>
                        {formValues.map((valueProps) => (
                            <Form.Field className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                <p>{I18n.t(valueProps.label) + ':'}</p>
                                <MyFormInput {...valueProps} onChange={(id, value) => props.onChange(id, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.STUDENT_LESSON:
                return (
                    <Form onSubmit={handleSubmit}>
                        {formValues.map((valueProps) => (
                            <Form.Field className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                <p>{I18n.t(valueProps.label) + ':'}</p>
                                <MyFormInput {...valueProps} onChange={(id, value) => props.onChange(id, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.STUDENT_PAYMENT:
                return (
                    <Form onSubmit={handleSubmit}>
                        {formValues.map((valueProps) => (
                            <Form.Field className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                <p>{I18n.t(valueProps.label) + ':'}</p>
                                <MyFormInput {...valueProps} onChange={(id, value) => props.onChange(id, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.TEACHER_LESSON:
                return (
                    <Form onSubmit={handleSubmit}>
                        {formValues.map((valueProps) => (
                            <Form.Field className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                <p>{I18n.t(valueProps.label) + ':'}</p>
                                <MyFormInput {...valueProps} onChange={(id, value) => props.onChange(id, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            default: return null;
        }
    };

    const getModalSize = () => {
        switch (type) {
            case MODAL_TYPES.ADMIN_STUDENT: return 'small';
            case MODAL_TYPES.ADMIN_TEACHER: return 'small';
            case MODAL_TYPES.ADMIN_LESSON: return 'large';
            case MODAL_TYPES.ADMIN_PAYMENT: return 'small';
            case MODAL_TYPES.STUDENT_LESSON: return 'small';
            case MODAL_TYPES.STUDENT_PAYMENT: return 'small';
            case MODAL_TYPES.TEACHER_LESSON: return 'small';
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
                <div>
                    {status === REQUEST_STATUS.ERROR && <Label color='red'>{I18n.t('common.modals.delete.error.' + type)}</Label>}
                    {status === REQUEST_STATUS.SUCCESS && <Label color='green'>{I18n.t('common.modals.delete.success.' + type)}</Label>}
                </div>
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
