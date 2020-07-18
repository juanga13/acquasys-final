// libraries
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// reducers
import { i18nReducer } from "react-redux-i18n";
import sessionReducer from '../screens/session/session.reducer';

import adminReducer from '../screens/account/admin/admin.reducer';
import adminStudentsReducer from '../screens/account/admin/students/admin.students.reducer';
import adminTeachersReducer from '../screens/account/admin/teachers/admin.teachers.reducer';
import adminLessonsReducer from '../screens/account/admin/lessons/admin.lessons.reducer';
import adminPaymentsReducer from '../screens/account/admin/payments/admin.payments.reducer';

const rootReducer = (history) => combineReducers({
    i18n: i18nReducer,
    session: sessionReducer,
    admin: combineReducers({
        main: adminReducer,
        students: adminStudentsReducer,
        teachers: adminTeachersReducer,
        lessons: adminLessonsReducer,
        payments: adminPaymentsReducer,
    }),
    // student: studentReducer,
    // unverified: unverifiedReducer,
    
    router: connectRouter(history),
});

export default rootReducer;