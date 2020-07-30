// libraries
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// reducers
import { i18nReducer } from "react-redux-i18n";
import sessionReducer from '../screens/session/session.reducer';

import adminReducer from '../screens/account/admin/admin.reducer';
import adminCalendarReducer from '../screens/account/admin/calendar/admin.calendar.reducer';
import adminStudentsReducer from '../screens/account/admin/students/admin.students.reducer';
import adminTeachersReducer from '../screens/account/admin/teachers/admin.teachers.reducer';
import adminLessonsReducer from '../screens/account/admin/lessons/admin.lessons.reducer';
import adminPaymentsReducer from '../screens/account/admin/payments/admin.payments.reducer';
import studentReducer from '../screens/account/student/student.reducer';
import teacherReducer from '../screens/account/teacher/teacher.reducer';
import unverifiedReducer from '../screens/account/unverified/unverified.reducer';
import commonReducer from '../screens/common/common.reducer';


const rootReducer = (history) => combineReducers({
    i18n: i18nReducer,
    session: sessionReducer,
    common: commonReducer,
    admin: combineReducers({
        main: adminReducer,
        calendar: adminCalendarReducer,
        students: adminStudentsReducer,
        teachers: adminTeachersReducer,
        lessons: adminLessonsReducer,
        payments: adminPaymentsReducer,
    }),
    student: studentReducer,
    teacher: teacherReducer,
    unverified: unverifiedReducer,
    
    router: connectRouter(history),
});

export default rootReducer;