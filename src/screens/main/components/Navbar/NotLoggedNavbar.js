import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Sticky, Menu, Image, Icon } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';

const NotLoggedNavbar = (props) => {
    return (
        <Menu.Menu position='right'>
            <Menu.Item as={NavLink} exact to='/'><Icon name='home'/>{I18n.t('main.navbar.home')}</Menu.Item>
            <Menu.Item as={NavLink} to='/login'><Icon name='sign-in'/>{I18n.t('main.navbar.login')}</Menu.Item>
            <Menu.Item as={NavLink} to='/register'><Icon name='signup'/>{I18n.t('main.navbar.register')}</Menu.Item>
        </Menu.Menu>
    );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotLoggedNavbar));