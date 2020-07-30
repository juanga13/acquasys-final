export const ADMIN_GET_CALENDAR = 'ADMIN_GET_CALENDAR';
export const ADMIN_GET_CALENDAR_RESPONSE = 'ADMIN_GET_CALENDAR_RESPONSE';
export const ADMIN_GET_CALENDAR_ERROR = 'ADMIN_GET_CALENDAR_ERROR';


const adminCalendarActions = {
    getCalendar: (startDate, endDate) => ({ type: ADMIN_GET_CALENDAR, startDate, endDate }),
    getCalendarResponse: (data) => ({ type: ADMIN_GET_CALENDAR_RESPONSE, response: data }),
    getCalendarError: () => ({ type: ADMIN_GET_CALENDAR_ERROR }),
};

export default adminCalendarActions;