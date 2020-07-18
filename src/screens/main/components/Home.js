import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import { Header, Loader } from 'semantic-ui-react';
import { REQUEST_STATUS } from '../../../utils/consts';

const Home = (props) => {
    const {
        isLoggedIn,
        getProfileStatus,
        profile
    } = props;

    const renderText = () => {
        if (isLoggedIn) {
            switch (getProfileStatus) {
                case REQUEST_STATUS.ERROR: return (<p>{I18n.t('main.error.welcome')}</p>);
                case REQUEST_STATUS.LOADING: return (<Loader/>);
                case REQUEST_STATUS.SUCCESS: return (<p>{I18n.t('main.welcome', { name: profile.name || '', surname: profile.surname || '' })}</p>);
                default: return (<Loader/>);
            }
        } else return (<p>{I18n.t('main.unloggedWelcome')}</p>);
    };

    return (
        <div className='section-container'>
            <Header>{I18n.t('main.home.title')}</Header>
            {renderText()}
        </div>
    )
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.session.isLoggedIn,
    getProfileStatus: state.session.getProfileStatus,
    profile: state.session.profile
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));