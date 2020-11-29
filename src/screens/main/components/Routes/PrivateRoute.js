import React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

/**
 * if not logged in redirects
 * functional to role given as parameter to redirect if logged i
 */
const PrivateRoute = (props) => {
    const {
        roleNeeded, redirectTo = '/',
        key, path, component,
        isLoggedIn,
    } = props;
    const role = localStorage.getItem('role');
    console.log('private route', path, 'isLoggedIn: ', isLoggedIn, 'roleNeeded', roleNeeded, 'role', role)
    if (!isLoggedIn) return (<Redirect to={redirectTo}/>);
    if (roleNeeded !== undefined && role !== roleNeeded) return (<Redirect to={redirectTo}/>);
    return (
        <Route
            key={key}
            path={path}
            component={component}
        />
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.session.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
