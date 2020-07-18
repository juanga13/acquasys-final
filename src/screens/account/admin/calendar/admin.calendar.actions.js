export const GET_CALENDAR = 'GET_CALENDAR';
export const GET_CALENDAR_RESPONSE = 'GET_CALENDAR_RESPONSE';
export const GET_CALENDAR_ERROR = 'GET_CALENDAR_ERROR';


const adminCalendarActions = {
    getCalendar: (startDate, endDate) => ({ type: GET_CALENDAR, startDate, endDate }),
    getCalendarResponse: (data) => ({ type: GET_CALENDAR_RESPONSE, response: data }),
    getCalendarError: () => ({ type: GET_CALENDAR_ERROR }),
};

export default adminCalendarActions;