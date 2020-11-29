import React from 'react';
import { ROLES } from '../../../utils/consts';
import { connect } from 'react-redux';
 
import { AdminProfile } from '../../account/admin';
import { StudentProfile } from '../../account/student';
import { TeacherProfile } from '../../account/teacher';
import { UnverifiedProfile } from '../../account/unverified';
import './MyProfile.scss';

const MyProfile = (props) => {
    const role = localStorage.getItem('role');

    switch (role) {
        case ROLES.ADMIN:
            return (
                <AdminProfile/>
            );
        case ROLES.STUDENT:
            return (
                <StudentProfile/>
            );
        case ROLES.TEACHER:
            return (
                <TeacherProfile/>
            );
        case ROLES.UNVERIFIED_STUDENT:
            return (
                <UnverifiedProfile/>
            );

        default: return <p>NULL MyProfile</p>
    };
};

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
