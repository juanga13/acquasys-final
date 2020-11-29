import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Image, Icon, Loader } from 'semantic-ui-react';
import { brandLogo } from '../../../../assets';
import { REQUEST_STATUS, ROLES } from '../../../../utils/consts';
import sessionActions from '../../../session/session.actions';

const Navbar = (props) => {
    const {
        isLoggedIn,
        loading,
    } = props;

    return (
        <Menu borderless style={{ borderRadius: 0 }} height='10px'>
            <Menu.Item as={NavLink} exact to='/'>
                <Image src={brandLogo} height='50px'/>
            </Menu.Item>
            {loading ?
                <Menu.Item position='right'>
                    <div className='navbar-loading'>    
                        <Loader/>
                    </div>
                </Menu.Item>
                :
                <Menu.Menu position='right'>
                    {/* === not logged === */}
                    {!isLoggedIn && <Menu.Item as={NavLink} exact to='/'><Icon name='home'/>{I18n.t('main.navbar.home')}</Menu.Item>}
                    {!isLoggedIn && <Menu.Item as={NavLink} to='/login'><Icon name='sign-in'/>{I18n.t('main.navbar.login')}</Menu.Item>}
                    {!isLoggedIn && <Menu.Item as={NavLink} to='/register'><Icon name='signup'/>{I18n.t('main.navbar.register')}</Menu.Item>}

                    {/* ===== logged ===== */}
                    {/* admin items */}
                    <NavItemLoggedRole key='navbar-item-admin-1' to='/admin/calendar' iconName='calendar' text='main.navbar.calendar' isLoggedIn={isLoggedIn} role={ROLES.ADMIN} />
                    <NavItemLoggedRole key='navbar-item-admin-2' to='/admin/students' iconName='child' text='main.navbar.students' isLoggedIn={isLoggedIn} role={ROLES.ADMIN} />
                    <NavItemLoggedRole key='navbar-item-admin-3' to='/admin/teachers' iconName='female' text='main.navbar.teachers' isLoggedIn={isLoggedIn} role={ROLES.ADMIN} />
                    <NavItemLoggedRole key='navbar-item-admin-4' to='/admin/lessons' iconName='calendar alternate outline' text='main.navbar.lessons' isLoggedIn={isLoggedIn} role={ROLES.ADMIN} />
                    <NavItemLoggedRole key='navbar-item-admin-5' to='/admin/payments' iconName='money bill alternate' text='main.navbar.payments' isLoggedIn={isLoggedIn} role={ROLES.ADMIN} />                
                    {/* student items */}
                    <NavItemLoggedRole key='navbar-item-student-1' to='/student/calendar' iconName='calendar' text='main.navbar.calendar' isLoggedIn={isLoggedIn} role={ROLES.STUDENT}/>
                    <NavItemLoggedRole key='navbar-item-student-2' to='/student/lessons' iconName='calendar alternate outline' text='main.navbar.lessons' isLoggedIn={isLoggedIn} role={ROLES.STUDENT}/>
                    <NavItemLoggedRole key='navbar-item-student-3' to='/student/payments' iconName='money bill alternate' text='main.navbar.payments' isLoggedIn={isLoggedIn} role={ROLES.STUDENT}/>                
                    {/* teacher items */}
                    <NavItemLoggedRole key='navbar-item-teacher-2' to='/teacher/lessons' iconName='calendar alternate outline' text='main.navbar.lessons' isLoggedIn={isLoggedIn} role={ROLES.TEACHER}/>
                    {/* logged, any role items */}
                    <NavItemLogged key='navbar-item-messaging' as={NavLink} to='/messaging' iconName='mail' text='main.navbar.messaging' isLoggedIn={isLoggedIn}/>
                    <NavItemLogged key='navbar-item-profile' as={NavLink} to='/profile' iconName='user' text='main.navbar.profile' isLoggedIn={isLoggedIn}/>
                    {isLoggedIn && <Menu.Item key='navbar-item-logout' onClick={props.logout}><Icon name='power off'/>{I18n.t('main.navbar.logout')}</Menu.Item>}
                </Menu.Menu>
            }
        </Menu>
    );
};

const NavItemLogged = (props) => {
    const {key, to, iconName, text, isLoggedIn} = props;
    if (!isLoggedIn) return null;
    return (
        <Menu.Item key={key} as={NavLink} to={to}>
            <Icon name={iconName}/>
            {I18n.t(text)}
        </Menu.Item>
    );
}

const NavItemLoggedRole = (props) => {
    const {key, to, iconName, text, isLoggedIn, role} = props;
    const myRole = localStorage.getItem('role');
    if (!isLoggedIn) return null;
    if (role !== myRole) return null;
    return (
        <Menu.Item key={key} as={NavLink} to={to}>
            <Icon name={iconName}/>
            {I18n.t(text)}
        </Menu.Item>
    );
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.session.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(sessionActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)