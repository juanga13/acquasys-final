import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Divider, Form, Button } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import sessionActions from '../session.actions';
import { REQUEST_STATUS, FORMS } from '../../../utils/consts';
import verifyInput from '../../../utils/verifyInput';

const Register = (props) => {
    const {
        form,
        registerStatus
    } = props;

    return (
        <div className='loginRegister-container' >
            <Header>{I18n.t('session.titles.register')}</Header>
            <Divider />
            <Form onSubmit={props.register} loading={registerStatus === REQUEST_STATUS.LOADING}>
                {Object.values(form).map((fieldProps, i) =>
                    <Form.Input
                        {...fieldProps}
                        key={'login-form-field-' + i}
                        value={fieldProps.value}
                        placeholder={I18n.t(fieldProps.placeholder)}
                        label={I18n.t(fieldProps.label)}
                        onChange={(e) => props.inputChange(FORMS.REGISTER, fieldProps.id, fieldProps.type, e.target.value)}
                    />
                )}
                <Button color='blue' type='submit'>{I18n.t('session.form.button.register')}</Button>
            </Form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    form: state.session.forms.register,
    registerStatus: state.session.registerStatus
});

const mapDispatchToProps = (dispatch) => ({
    register: () => dispatch(sessionActions.register()),
    inputChange: (formType, id, type, value) => dispatch(sessionActions.sessionInputChange(formType, id, type, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));