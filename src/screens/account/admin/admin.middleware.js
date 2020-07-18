import adminActions, {
    GET_ALL_DATA
} from './admin.actions';
import adminStudentsActions from './students/admin.students.actions';
import adminTeachersActions from './teachers/admin.teachers.actions';
import adminLessonsActions from './lessons/admin.lessons.actions';
import adminPaymentsActions from './payments/admin.payments.actions';

const adminMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
         case GET_ALL_DATA:
            dispatch(adminStudentsActions.getStudents());
            dispatch(adminTeachersActions.getTeachers());
            dispatch(adminLessonsActions.getLessons());
            dispatch(adminPaymentsActions.getPayments());
            break;

        default: break;
    }
};

export default adminMiddleware;