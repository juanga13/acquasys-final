import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Image, Icon } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { ROLES } from '../../../../utils/consts';
import adminActions from '../../../account/admin/admin.actions';
import sessionActions from '../../../session/session.actions';

const LoggedInNavbar = (props) => {
    const role = localStorage.getItem('role');

    const renderRoleNavbarItems = () => {
        switch(role) {
            case ROLES.ADMIN:
                return ([
                    <Menu.Item key='navbar-item-admin-1' as={NavLink} to='/calendar'><Icon name='calendar'/>{I18n.t('main.navbar.calendar')}</Menu.Item>,
                    <Menu.Item key='navbar-item-admin-2' as={NavLink} to='/students'><Icon name='child'/>{I18n.t('main.navbar.students')}</Menu.Item>,
                    <Menu.Item key='navbar-item-admin-3' as={NavLink} to='/teachers'><Icon name='female'/>{I18n.t('main.navbar.teachers')}</Menu.Item>,
                    <Menu.Item key='navbar-item-admin-4' as={NavLink} to='/lessons'><Icon name='calendar alternate outline'/>{I18n.t('main.navbar.lessons')}</Menu.Item>,
                    <Menu.Item key='navbar-item-admin-5' as={NavLink} to='/payments'><Icon name='money bill alternate'/>{I18n.t('main.navbar.payments')}</Menu.Item>
                ]);
                
            case ROLES.STUDENT:
                return ([
                    <Menu.Item key='navbar-item-student-1' as={NavLink} to='/calendar'><Icon name='calendar'/>{I18n.t('main.navbar.calendar')}</Menu.Item>,
                    <Menu.Item key='navbar-item-student-2' as={NavLink} to='/lessons'><Icon name='calendar alternate outline'/>{I18n.t('main.navbar.lessons')}</Menu.Item>,
                    <Menu.Item key='navbar-item-student-3' as={NavLink} to='/payments'><Icon name='money bill alternate'/>{I18n.t('main.navbar.payments')}</Menu.Item>
                ]);

            case ROLES.TEACHER:
                return ([
                    <Menu.Item key='navbar-item-teacher-1' as={NavLink} to='/calendar'><Icon name='calendar'/>{I18n.t('main.navbar.calendar')}</Menu.Item>,
                    <Menu.Item key='navbar-item-teacher-2' as={NavLink} to='/lessons'><Icon name='calendar alternate outline'/>{I18n.t('main.navbar.lessons')}</Menu.Item>
                ]);

            case ROLES.UNVERIFIED_STUDENT: return [];

            default: return [];
        }
    }

    return (
        <Menu.Menu position='right'>
            <Menu.Item key='navbar-item-home' as={NavLink} exact to='/'><Icon name='home'/>{I18n.t('main.navbar.home')}</Menu.Item>
            {renderRoleNavbarItems()}
            <Menu.Item key='navbar-item-profile' as={NavLink} to='/profile'><Icon name='user'/>{I18n.t('main.navbar.profile')}</Menu.Item>
            <Menu.Item key='navbar-item-logout' onClick={props.logout}><Icon name='power off'/>{I18n.t('main.navbar.logout')}</Menu.Item>
        </Menu.Menu>
    );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(sessionActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoggedInNavbar))