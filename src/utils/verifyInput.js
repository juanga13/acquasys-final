import { FIELD_TYPES } from "./consts";

/**
 * Given the params, it tells you whether the input
 * has valid data.
 * 
 * @param { string } id should not be used, but just in case an exception is needed
 * @param { text | number | email | password | date } type 
 * @param { any } value 
 * 
 * @returns { boolean } is value valid
 */
export default function(id, type, value) {
    console.log(id, type, value);
    // invalid parameters, cannot be null
    if (!id || !type || !value || id === '' || type === '' || value === '') {
        console.log(`input verification invalid parameters {id: ${id}, type: ${type}, value: ${value}}`);
        return false;
    }
    switch (type) {
        case FIELD_TYPES.STRING: return (value.length > 3);
        case FIELD_TYPES.PASSWORD: return (value.length > 3);
        case FIELD_TYPES.EMAIL: return (/^[\w-.]{3,50}@([\w-]+\.)+[\w-]{2,4}$/.test(value.length));
        case FIELD_TYPES.NUMBER: return (value.length > 0);
        case FIELD_TYPES.DATE: return (true);
        case FIELD_TYPES.BOOLEAN: return (true);
        case FIELD_TYPES.TEXT_AREA: return (true);
        
        case FIELD_TYPES.NULL: return (true)
        default:
            return true; //
    }
}