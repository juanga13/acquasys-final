import PropTypes from 'prop-types';


export const dateToString = (date) => {
    if (date.constructor !== 'Date') {console.log('date to string error, received not a date'); return 'error'};
    console.log()
    return `${date}`;
}
dateToString.PropTypes = {
    date: PropTypes.Date,
}