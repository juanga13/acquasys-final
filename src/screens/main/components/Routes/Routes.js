import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import sessionActions from '../../../session/session.actions';
import { Parallax } from 'react-parallax';
import { background } from '../../../../assets';
import './Routes.scss';
import { SemanticToastContainer } from 'react-semantic-toasts';
import PrivateRoute from './PrivateRoute';
import { REQUEST_STATUS, ROLES } from '../../../../utils/consts';

import Home from '../Home';
import Login from '../../../session/components/Login';
import Register from '../../../session/components/Register';

import { AdminCalendar, AdminStudents, AdminLessons, AdminPayments, AdminTeachers } from '../../../account/admin';
import { StudentCalendar, StudentLessons } from '../../../account/student';
import { TeacherCalendar, TeacherLessons } from '../../../account/teacher';
import MyProfile from '../../../common/components/MyProfile/MyProfile';
import Messaging from '../../../common/components/Messaging/Messaging';
import { Loader } from 'semantic-ui-react';


const routesObj = {

};

/**
 * @returns {Component} with all navigable routes.
 */
const Routes = (props) => {

    const {
        /* variables */
        isLoggedIn,
        refreshStatus,
        loginStatus,
        /** actions: [refreshToken] */
    } = props;
    const loading = refreshStatus === REQUEST_STATUS.LOADING || loginStatus === REQUEST_STATUS.LOADING;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) props.refreshToken();
    }, []);

    useEffect(() => { }, [props.isLoggedIn, props.refreshStatus]);

    return (
        <div className='main-container'>
            <Parallax
                blur={2}
                bgImage={background}
                bgImageAlt="background"
                strength={500}
            >
                <Navbar loading={loading} />
                <SemanticToastContainer 
                    className='notification-container'
                    position='top-left'
                    animation='fly right'    
                />
                {loading ?
                    <div className='routes-container-loader'>
                        <Loader size='massive'/>
                    </div>
                    :
                    <div className='routes-container'>
                        <Switch>
                            {/* ========== NOT LOGIN ========== */}
                            <Route exact path='/' component={Home}/>
                            {/* <Route path='/news' component={News}/> */}
                            {/* <Route path='/contact' component={Contact}/> */}
                            {!isLoggedIn && <Route path='/login' component={Login}/>}
                            {!isLoggedIn && <Route path='/register' component={Register}/>}

                            {/* ========== LOGIN ========== */}
                            {/* todos pueden acceder */}
                            <PrivateRoute
                                key=''
                                path='/profile'
                                component={MyProfile}
                                />
                            <PrivateRoute
                                key=''
                                path='/messaging'
                                component={Messaging}
                            />
                            {/* admin */}
                            <PrivateRoute
                                roleNeeded={ROLES.ADMIN}
                                key='route-admin-1' 
                                path='/admin/calendar' 
                                component={AdminCalendar}
                            />
                            <PrivateRoute
                                roleNeeded={ROLES.ADMIN}
                                key='route-admin-2' 
                                path='/admin/students' 
                                component={AdminStudents}
                            />
                            <PrivateRoute
                                roleNeeded={ROLES.ADMIN}
                                key='route-admin-3' 
                                path='/admin/lessons' 
                                component={AdminLessons}
                            />
                            <PrivateRoute
                                roleNeeded={ROLES.ADMIN}
                                key='route-admin-4' 
                                path='/admin/payments' 
                                component={AdminPayments}
                            />
                            <PrivateRoute
                                roleNeeded={ROLES.ADMIN}
                                key='route-admin-5' 
                                path='/admin/teachers' 
                                component={AdminTeachers}
                            />
                            
                            {/* student */}
                            <PrivateRoute
                                roleNeeded={ROLES.STUDENT}
                                key='route-student-1'
                                path='/student/calendar'
                                component={StudentCalendar}
                            />
                            <PrivateRoute
                                roleNeeded={ROLES.STUDENT}
                                key='route-student-2'
                                path='/student/lessons'
                                component={StudentLessons}
                            />

                            {/* teacher */}
                            <PrivateRoute
                                roleNeeded={ROLES.TEACHER}
                                key='route-teacher-1'
                                path='/teacher/calendar'
                                component={TeacherCalendar}
                            />
                            <PrivateRoute
                                roleNeeded={ROLES.TEACHER}
                                key='route-student-2'
                                path='/teacher/lessons'
                                component={TeacherLessons}
                            />
                            {/* <Route key='route-teacher-2' path='/lessons' component={TeacherLessons} /> */}

                            {/* cualquier otra direccion redirige a "/" */}
                            <Route path='*' render={() => <Redirect exact to='/' />} />
                        </Switch>
                    </div>
                }
            </Parallax >
        </div>
    )
};

const mapStateToProps = state => ({
    isLoggedIn: state.session.isLoggedIn,
    refreshStatus: state.session.refreshStatus,
    loginStatus: state.session.loginStatus,
});

const mapDispatchToProps = dispatch => ({
    refreshToken: () => dispatch(sessionActions.refreshToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes)