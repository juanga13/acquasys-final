import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, Form, Image, Button, Icon, Loader, Dimmer, Label } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { dummyAvatar } from '../../../../assets';
import { MODAL_TYPES, REQUEST_STATUS } from '../../../../utils/consts';
import MyFormInput from '../MyFormInput';
import verifyInput from '../../../../utils/verifyInput';

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
        type,
        form,
        showImage,
        loading
    } = props;
    const [formValid, setFormValid] = useState(true);

    const formValues = form ? Object.values(form) : [];
    
    const handleChange = (id, type, value) => {
        if (formValues.some((item) => {
            return value.required && !verifyInput(item.id, item.type, item.value)
        })) setFormValid(false);
        else setFormValid(true);
        props.onChange(id, type, value);
    };

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
                            <Form.Field required={valueProps.required} className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                <label>{I18n.t(valueProps.label) + ':'}</label>
                                <MyFormInput {...valueProps} onChange={(id, type, value) => handleChange(id, type, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.ADMIN_TEACHER:
                return (
                    <Form onSubmit={handleSubmit}>
                        {formValues.map((valueProps) => (
                            <Form.Field required={valueProps.required} className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                <label>{I18n.t(valueProps.label) + ':'}</label>
                                <MyFormInput {...valueProps} onChange={(id, type, value) => handleChange(id, type, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.ADMIN_LESSON:
                return (
                    <Form onSubmit={handleSubmit}>
                        {formValues.map((valueProps) => {
                            const setCustomFieldClassName = () => {
                                switch (valueProps.id) {
                                    case 'students': return 'field-container_students';
                                    case 'teachers': return 'field-container_teachers';
                                    case 'weekdays': return 'field-container_weekdays';
                                    default: return 'field-container';
                                }
                            };
                            return (
                                <Form.Field
                                    required={valueProps.required}
                                    className={setCustomFieldClassName()}
                                    key={'modal-edit-form-field-' + valueProps.id}
                                >
                                    <label>{I18n.t(valueProps.label) + ':'}</label>
                                    <MyFormInput
                                        {...valueProps}
                                        students={valueProps.id === 'students' && props.students}
                                        teachers={valueProps.id === 'teachers' && props.teachers}
                                        onChange={(id, type, value) => handleChange(id, type, value)}
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
                            <Form.Field required={valueProps.required} className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                <label>{I18n.t(valueProps.label) + ':'}</label>
                                <MyFormInput 
                                    {...valueProps}
                                    students={valueProps.id === 'student' && props.students}
                                    onChange={(id, type, value) => handleChange(id, type, value)} 
                                />
                            </Form.Field>
                        ))}
                    </Form>
                );
                
            case MODAL_TYPES.TEACHER_ASSISTANCES:
                return (
                    <Form>
                        {formValues.map((value, i) => (
                            <p>{'EDIT' + value}</p>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.STUDENT_LESSON:
                return (
                    <Form onSubmit={handleSubmit}>
                        {formValues.map((valueProps) => (
                            <Form.Field required={valueProps.required} className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                <label>{I18n.t(valueProps.label) + ':'}</label>
                                <MyFormInput {...valueProps} onChange={(id, type, value) => handleChange(id, type, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.STUDENT_PAYMENT:
                return (
                    <Form onSubmit={handleSubmit}>
                        {formValues.map((valueProps) => (
                            <Form.Field required={valueProps.required} className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                <label>{I18n.t(valueProps.label) + ':'}</label>
                                <MyFormInput {...valueProps} onChange={(id, type, value) => handleChange(id, type, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.TEACHER_LESSON:
                return (
                    <Form onSubmit={handleSubmit}>
                        {formValues.map((valueProps) => (
                            <Form.Field required={valueProps.required} className='field-container' key={'modal-edit-form-field-' + valueProps.id} >
                                <label>{I18n.t(valueProps.label) + ':'}</label>
                                <MyFormInput {...valueProps} onChange={(id, type, value) => handleChange(id, type, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );
                
            case MODAL_TYPES.TEACHER_ASSISTANCES:
                return (
                    <Form>
                        {formValues.map((value, i) => (
                            <p>{'EDIT' + value}</p>
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
                {showImage && <Image wrapped size='small' src={dummyAvatar} />}
                <Modal.Description>
                    {renderForm()}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' disabled={!formValid} onClick={props.onSubmit}><Icon name='check' />{I18n.t('common.modals.edit.buttons.submit')}</Button>
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
