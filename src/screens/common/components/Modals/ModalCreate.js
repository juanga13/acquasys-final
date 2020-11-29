import React, { useState } from 'react';
import { Modal, Button, Icon, Image, Form, Dimmer, Loader, Header, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { dummyAvatar } from '../../../../assets';
 
import { MODAL_TYPES, REQUEST_STATUS } from '../../../../utils/consts';
import MyFormInput from '../MyFormInput';
import fireToast from '../Toaster';
import verifyInput from '../../../../utils/verifyInput';

/**
 * 
 * @param {object} props:
 * - isOpen -> boolean
 * - onClose -> action
 * - onSubmit -> submit creation
 * - loading -> boolean
 * - form -> of values in redux
 * - type -> (enum) modal types in const
 * - error -> si falla al crear
 */
const ModalCreate = (props) => {
    const {
        isOpen,
        form,
        type,
        error,
        showImage,
        loading
    } = props;
    const [formValid, setFormValid] = useState(false);

    // const formKeys = form ? Object.keys(form) : [];
    const formValues = form ? Object.values(form) : [];

    const handleChange = (id, type, value) => {
        if (formValues.some((item) => value.required && !verifyInput(item.id, item.type, item.value))) setFormValid(false);
        else setFormValid(true);
        props.onChange(id, type, value);
    };
    
    const renderForm = () => {
        switch (type) {
            case MODAL_TYPES.ADMIN_STUDENT:
                return (
                    <Form>
                        {formValues.map((valueProps) => (
                            <Form.Field required={valueProps.required} className='field-container' key={'modal-create-form-field-' + valueProps.id}>
                                <label>{I18n.t(valueProps.label) + ':'}</label>
                                <MyFormInput {...valueProps} onChange={(id, type, value) => handleChange(id, type, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.ADMIN_TEACHER:
                return (
                    <Form>
                        {formValues.map((valueProps) => (
                            <Form.Field required={valueProps.required} className='field-container' key={'modal-create-form-field-' + valueProps.id}>
                                <label>{I18n.t(valueProps.label) + ':'}</label>
                                <MyFormInput {...valueProps} onChange={(id, type, value) => handleChange(id, type, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.ADMIN_LESSON:
                return (
                    <Form>
                        {formValues.map((valueProps) => (
                            <Form.Field required={valueProps.required} className='field-container' key={'modal-create-form-field-' + valueProps.id}>
                                <label>{I18n.t(valueProps.label) + ':'}</label>
                                <MyFormInput 
                                    {...valueProps} 
                                    students={valueProps.id === 'students' && props.students}
                                    teachers={valueProps.id === 'teachers' && props.teachers}
                                    onChange={(id, type, value) => handleChange(id, type, value)} 
                                />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.ADMIN_PAYMENT:
                console.log('modal create payments', formValues);
                return (
                    <Form>
                        {formValues.map((valueProps) => (
                            <Form.Field required={valueProps.required} className='field-container' key={'modal-create-form-field-' + valueProps.id}>
                                <label>{I18n.t(valueProps.label) + ':'}</label>
                                <MyFormInput 
                                    {...valueProps} 
                                    students={valueProps.id === 'student' && props.students}
                                    onChange={(id, type, value) => handleChange(id, type, value)} />
                            </Form.Field>
                        ))}
                    </Form>
                );

            case MODAL_TYPES.STUDENT_LESSON:
                return null;

            case MODAL_TYPES.STUDENT_PAYMENT:
                return null;

            case MODAL_TYPES.TEACHER_LESSON:
                return null;

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
    };

    return (
        <Modal
            size={getModalSize()}
            open={isOpen}
            onClose={props.onClose}
        >
            <Dimmer active={loading} inverted><Loader /></Dimmer>
            <Modal.Header>
                <Header>{I18n.t('common.modals.create.title.' + type)}</Header>
                {error && <Label>{I18n.t('common.modals.create.error.creation')}</Label>}
            </Modal.Header>
            <Modal.Content image>
                {showImage && <Image wrapped size='small' src={dummyAvatar} />}
                <Modal.Description>
                    {renderForm()}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color='green'
                    disabled={!formValid}
                    onClick={props.onSubmit}
                >
                    <Icon name='check' />
                    {I18n.t('common.modals.create.buttons.create')}
                </Button>
                <Button
                    color='red'
                    onClick={props.onClose}><Icon name='close' />{I18n.t('common.modals.create.buttons.cancel')}</Button>
            </Modal.Actions>
        </Modal>
    )
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate);