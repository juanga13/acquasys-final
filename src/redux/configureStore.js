import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './rootReducer';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {
    setLocale,
    loadTranslations,
    syncTranslationWithStore,
} from "react-redux-i18n";
import { translations } from '../locales/index';
import sessionMiddleware from '../screens/session/session.middleware';
import adminMiddleware from '../screens/account/admin/admin.middleware';
import adminCalendarMiddleware from '../screens/account/admin/calendar/admin.calendar.middleware';
import adminLessonsMiddleware from '../screens/account/admin/lessons/admin.lessons.middleware';
import adminPaymentsMiddleware from '../screens/account/admin/payments/admin.payments.middleware';
import adminStudentsMiddleware from '../screens/account/admin/students/admin.students.middleware';
import adminTeachersMiddleware from '../screens/account/admin/teachers/admin.teachers.middleware';
import studentMiddleware from '../screens/account/student/student.middleware';
import teacherMiddleware from '../screens/account/teacher/teacher.middleware';
import unverifiedMiddleware from '../screens/account/unverified/unverified.middleware';
import commonMiddleware from '../screens/common/common.middleware';


export const history = createBrowserHistory();
export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        applyMiddleware(
            thunk,
            logger,
            sessionMiddleware,
            commonMiddleware,
            adminMiddleware,
            adminCalendarMiddleware,
            adminLessonsMiddleware,
            adminPaymentsMiddleware,
            adminStudentsMiddleware,
            adminTeachersMiddleware,
            studentMiddleware,
            teacherMiddleware,
            unverifiedMiddleware,
            routerMiddleware(history),
        ),
    )

    /* i18n with redux configuration */
    syncTranslationWithStore(store);
    store.dispatch(loadTranslations(translations));
    store.dispatch(setLocale('es'));

    return store
};