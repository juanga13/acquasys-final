import PropTypes from 'prop-types';
import { FIELD_TYPES } from './consts';


const verifyField = (type, value) => {
    switch (type) {
        case FIELD_TYPES.STRING: return (value.length > 0)
        case FIELD_TYPES.PASSWORD: return (value.length > 3)
        case FIELD_TYPES.EMAIL: return (value.length > 0)
        case FIELD_TYPES.NUMBER: return (value.length > 0)
        case FIELD_TYPES.DATE: return (true)
        case FIELD_TYPES.BOOLEAN: return (true)
        case FIELD_TYPES.NULL: return (true)

        default: return false;
    }
};

verifyField.propTypes = {
    type: PropTypes.string,
    value: PropTypes.object
};

export default verifyField;