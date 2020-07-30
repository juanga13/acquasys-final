import React from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom';
import { ROLES } from '../../../../utils/consts';
import Home from '../Home';
import { AdminCalendar, AdminStudents, AdminLessons, AdminPayments, AdminTeachers } from '../../../account/admin';
import { StudentCalendar, StudentLessons, StudentPayments } from '../../../account/student';
import { TeacherCalendar, TeacherLessons } from '../../../account/teacher';
import MyProfile from '../../../common/components/MyProfile';
import Messaging from '../../../common/components/Messaging';


/**
 * @returns {Component} with all navigable routes.
 */
const LoggedInRoutes = (props) => {
    const role = localStorage.getItem('role');

    const renderRoleRoutes = () => {
        switch (role) {
            case ROLES.ADMIN:
                return ([
                    <Route key='route-admin-1' path='/calendar' component={AdminCalendar} />,
                    <Route key='route-admin-2' path='/students' component={AdminStudents} />,
                    <Route key='route-admin-3' path='/lessons' component={AdminLessons} />,
                    <Route key='route-admin-4' path='/payments' component={AdminPayments} />,
                    <Route key='route-admin-5' path='/teachers' component={AdminTeachers} />
                ]);

            case ROLES.STUDENT:
                return ([
                    <Route key='route-student-1' path='/calendar' component={StudentCalendar} />,
                    <Route key='route-student-2' path='/lessons' component={StudentLessons} />,
                    <Route key='route-student-3' path='/payments' component={StudentPayments} />
                ]);

            case ROLES.UNVERIFIED_STUDENT:
                return ([
                ]);

            case ROLES.TEACHER:
                return ([
                    // <Route key='route-teacher-1' path='/calendar' component={TeacherCalendar} />,  // no esta hecho en el back
                    <Route key='route-teacher-2' path='/lessons' component={TeacherLessons} />
                ]);

            default: return null;
        }
    };

    return (
        <div>
            <div className='routes-container'>
                <Route exact path='/' component={Home} />
                <Route path='/profile' component={MyProfile} />
                <Route path='/messaging' component={Messaging} />
                {renderRoleRoutes()}

                <Route path='*' render={() => <Redirect exact to='/' />} />
            </div>
        </div>
    )
};

export default withRouter(LoggedInRoutes);