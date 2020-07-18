import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoggedInRoutes from './LoggedInRoutes';
import NotLoggedInRoutes from './NotLoggedRoutes';
import Navbar from '../Navbar/Navbar';
import sessionActions from '../../../session/session.actions';
import { Parallax, Background } from 'react-parallax';
import { background } from '../../../../assets';
import './Routes.scss';
import { SemanticToastContainer } from 'react-semantic-toasts';
import fireToast from '../../../common/components/Toaster';

/**
 * @returns {Component} with all navigable routes.
 */
const Routes = (props) => {

    const {
        /* variables */
        isLoggedIn,
        // refreshStatus,
        /** actions: [refreshToken] */
    } = props;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) props.refreshToken();
    }, [])

    useEffect(() => { }, [props.isLoggedIn, props.refreshStatus])

    return (
        <div className='main-container'>
            <Parallax
                blur={2}
                bgImage={background}
                bgImageAlt="background"
                strength={500}
            >
                <Navbar />
                <SemanticToastContainer 
                    className='notification-container'
                    position='top-left'
                    animation='fly right'    
                />
                <div className='routes-container'>
                    {isLoggedIn ? <LoggedInRoutes /> : <NotLoggedInRoutes />}
                </div>
            </Parallax >
        </div>
    )
};

const mapStateToProps = state => ({
    isLoggedIn: state.session.isLoggedIn,
    refreshStatus: state.session.refreshStatus,
});

const mapDispatchToProps = dispatch => ({
    refreshToken: () => dispatch(sessionActions.refreshToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Routes))