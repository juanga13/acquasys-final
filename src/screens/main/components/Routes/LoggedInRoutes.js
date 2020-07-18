import React from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom';
import { ROLES } from '../../../../utils/consts';

import Navbar from '../Navbar/Navbar';
import Home from '../Home';
import MyProfile from '../../../common/components/MyProfile';

import { default as AdminLessons } from '../../../account/admin/lessons/components/Lessons';
import { default as AdminPayments } from '../../../account/admin/payments/components/Payments';
import { default as AdminStudents } from '../../../account/admin/students/components/Students';
import { default as AdminTeachers } from '../../../account/admin/teachers/components/Teachers';
import { AdminCalendar } from '../../../account/admin';


/**
 * @returns {Component} with all navigable routes.
 */
const LoggedInRoutes = (props) => {
    const role = localStorage.getItem('role');

    const renderRoleRoutes = () => {
        switch (role) {
            case ROLES.ADMIN:
                return ([
                    <Route key='route-admin-1' path='/calendar' component={AdminCalendar}/>,
                    <Route key='route-admin-2' path='/students' component={AdminStudents}/>,
                    <Route key='route-admin-3' path='/lessons' component={AdminLessons}/>,
                    <Route key='route-admin-4' path='/payments' component={AdminPayments}/>,
                    <Route key='route-admin-5' path='/teachers' component={AdminTeachers}/>
                ]);

            case ROLES.STUDENT:
                {/* <Route to='/calendar' component={Calendar}/> */}
                return ([
                    <Route key='route-student-1' path='/students' component={AdminStudents}/>,
                    <Route key='route-student-2' path='/lessons' component={AdminLessons}/>
                ]);

            case ROLES.UNVERIFIED_STUDENT:
                return (
                    <div>
                    </div>
                );
            case ROLES.TEACHER:
                {/* <Route to='/calendar' component={Calendar}/> */}
                return ([
                    <Route key='route-teacher-1' path='/students' component={AdminStudents}/>
                ]);

            default: return null;
        } 
    };

    return (
        <div>
            <div className='routes-container'>
                <Route exact path='/' component={Home}/>
                <Route path='/profile' component={MyProfile}/>
                {renderRoleRoutes()}

                <Route path='*' render={() => <Redirect exact to='/'/>}/>
            </div>
        </div>
    )
};

export default withRouter(LoggedInRoutes);