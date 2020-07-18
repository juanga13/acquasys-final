import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
// TODO
const PasswordInput = ({id, value, error, type, placeholder}) => {
    const [value1, setValue1] = useState(value);
    const [value1, setValue1] = useState('');
    // id = 'password'
    return (
        <Form.Group key={id + '-group'}>
            <Form.Input 
                id={id + '-1'}
                value={value1}
                error={error1}
                type={type}
                placeholder={I18n.t(placeholder)}
                />
            <Form.Input 
                id={id + '-1'}
                value={value1}
                error={error1}
                type={type}
                placeholder={I18n.t('forms.passwordRepeat')}
            />
        </Form.Group>
    )
}