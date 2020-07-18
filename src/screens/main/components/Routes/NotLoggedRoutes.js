import React from 'react'
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';
import Home from '../Home';
import Login from '../../../session/components/Login';
import Register from '../../../session/components/Register';

/**
 * 
 */
const NotLoggedRoutes = (props) => {
    return (
        <div className='routes-container'>
            <Route exact path='/' component={Home}/>
            {/* <Route path='/news' component={News}/> */}
            {/* <Route path='/contact' component={Contact}/> */}
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>

            <Route path='*' render={() => <Redirect exact to='/'/>}/>
        </div>
    )
};

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotLoggedRoutes))