import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Header, Divider } from 'semantic-ui-react';

const Profile = (props) => {
    const {
        profile,
    } = props;
    console.log('profile props', props);

    return (
        <div className='section-container'>
            <div className='section-header-container'>
                <Header>{I18n.t('common.myProfile.title')}</Header>
            </div>
            <Divider hidden/>
            <p>TODO para ver datos del perfil - estado de la cuenta - menu nuevo para completar datos si faltan</p>
        </div>
    );
};

const mapStateToProps = (state) => ({
    profile: state.session.profile,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
