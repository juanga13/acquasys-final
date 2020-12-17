import PropTypes from 'prop-types';


export const dateToString = (date) => {
    if (date.constructor !== 'Date') {console.log('date to string error, received not a date'); return 'error'};
    return `${date}`;
}

dateToString.PropTypes = {
    date: PropTypes.Date,
}

const monthsSimple = ['ENE', 'FEB', 'MAR', 'ABR', 'MAR', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
export const dateToSimple = (date) => {
    const datee = new Date(date);
    return `${datee.getDate()}/${monthsSimple[datee.getMonth()]}/${datee.getFullYear()} ${datee.getHours()}:${datee.getMinutes()}`
}