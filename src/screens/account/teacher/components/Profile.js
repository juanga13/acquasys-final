import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Header, Divider } from 'semantic-ui-react';

const Profile = (props) => {
    const {
        profile
    } = props;

    return (
        <div className='section-container'>
            <div className='section-header-container'>
                <Header>{I18n.t('common.myProfile.title')}</Header>
            </div>
            <Divider hidden/>
            <div className='label-container'>
                <p>{I18n.t('common.myProfile.name') + ': '}</p>
                <p>{profile.name}</p>
            </div>
            <div className='label-container'>
                <p>{I18n.t('common.myProfile.name') + ': '}</p>
                <p>{profile.surname}</p>
            </div>
            <div className='label-container'>
                <p>{I18n.t('common.myProfile.email') + ': '}</p>
                <p>{profile.email}</p>
            </div>
            <Divider hidden/>
            <p>TODO proxima lesson</p>
        </div>
    );
};

const mapStateToProps = (state) => ({
    profile: state.session.profile
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);