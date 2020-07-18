import {
    GET_ALL_DATA
} from './admin.actions';
import adminStudentsActions from './students/admin.students.actions';
import adminTeachersActions from './teachers/admin.teachers.actions';
import adminLessonsActions from './lessons/admin.lessons.actions';
import adminPaymentsActions from './payments/admin.payments.actions';
import adminCalendarActions from './calendar/admin.calendar.actions';
import { tenDaysBeforeNow } from '../../../utils/time';

const adminMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
         case GET_ALL_DATA:
            dispatch(adminStudentsActions.getStudents());
            dispatch(adminTeachersActions.getTeachers());
            dispatch(adminLessonsActions.getLessons());
            dispatch(adminPaymentsActions.getPayments());
            dispatch(adminPaymentsActions.getFee());
            dispatch(adminCalendarActions.getCalendar(tenDaysBeforeNow().getTime(), new Date().getTime()))
            break;

        default: break;
    }
};

export default adminMiddleware;