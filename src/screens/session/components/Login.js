import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Divider, Segment, Form, Button } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import sessionActions from '../session.actions';
import { REQUEST_STATUS, FORMS } from '../../../utils/consts';
import verifyField from '../../../utils/fieldVerifier';

const Login = (props) => {
    const {
        form,
        loginStatus
    } = props;

    const handleSubmit = () => {
        if (!Object.values(form).some(field => !verifyField(field.type, field.value))) {
            props.login();
        }
    };

    return (
        <div className='loginRegister-container' >
            <Header>{I18n.t('session.titles.login')}</Header>
            <Divider />
            {loginStatus === REQUEST_STATUS.ERROR &&
                <Segment inverted color='red'>{I18n.t('session.error.login')}</Segment>}
            <Form onSubmit={handleSubmit} loading={loginStatus === REQUEST_STATUS.LOADING}>
                {Object.values(form).map((fieldProps, i) => {
                    return <Form.Input
                        {...fieldProps}
                        key={'login-form-field-' + i}
                        value={fieldProps.value}
                        placeholder={I18n.t(fieldProps.placeholder)}
                        label={I18n.t(fieldProps.label)}
                        onChange={(e) => props.inputChange(FORMS.LOGIN, fieldProps.id, e.target.value)}
                    />
                })}
                <Button color='teal' type='submit'>{I18n.t('session.form.button.login')}</Button>
            </Form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    form: state.session.forms.login,
    loginStatus: state.session.loginStatus
});

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(sessionActions.login()),
    inputChange: (formType, type, value) => dispatch(sessionActions.sessionInputChange(formType, type, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));