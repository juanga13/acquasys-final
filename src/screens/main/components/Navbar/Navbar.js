import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import LoggedInNavbar from './LoggedInNavbar';
import NotLoggedNavbar from './NotLoggedNavbar';

const Navbar = (props) => {
    const {
        isLoggedIn
    } = props;

    return (
        <Menu borderless style={{ borderRadius: 0 }} height='10px'>
            <Menu.Item as={NavLink} exact to='/'>
                <Image
                    // src={brandLogo} // TODO
                    height='50px'
                />
            </Menu.Item>
            {isLoggedIn ? <LoggedInNavbar /> : <NotLoggedNavbar />}
        </Menu>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.session.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))