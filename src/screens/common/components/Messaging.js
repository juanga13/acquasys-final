import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Divider, Loader, Button } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import commonActions from '../common.actions';
import { MODAL_STATES, REQUEST_STATUS } from '../../../utils/consts';
import ModalNewMessage from './Modals/ModalNewMessage';


/**
 * 
 * @param { object } props -> none 
 */
const Messaging = (props) => {
    const {
        modalState,
        messages,
        getMessagesStatus,
        newMessageForm,
        sendMessageStatus,
        setReadMessageStatus
    } = props;
    const renderToasts = () => {

    };

    const renderModals = () => {
        return (
            <ModalNewMessage
                isOpen={modalState === MODAL_STATES.NEW_MESSAGE}
                form={newMessageForm}
                loading={sendMessageStatus === REQUEST_STATUS.LOADING}
                onChange={(id, value) => props.inputChange(id, value)}
                onCancel={() => props.modalStateChange(MODAL_STATES.CLOSED)}
                onSend={props.sendMessage}
            />
        )
    }
    // TODO falta el checkbox para set read
    return (
        <div className='section-container'>
            {renderModals()}
            {renderToasts()}
            <div className='section-header-container'>
                <Header floated='left'>{I18n.t('common.messaging.titles.header')}</Header>
                <Header floated='right'>
                    <Button color='teal' onClick={() => props.modalStateChange(MODAL_STATES.NEW_MESSAGE)}>
                        {I18n.t('common.messaging.buttons.newMessage')}
                    </Button>
                </Header>
            </div>
            <Header as='h4'>{I18n.t('common.messaging.titles.recieved')}</Header>
            <Divider hidden/>
            {getMessagesStatus === REQUEST_STATUS.LOADING && <Loader/>}
            {messages && messages.received.map(message => <p>{message.content}</p>)}
            <Header as='h4'>{I18n.t('common.messaging.titles.sent')}</Header>
            <Divider hidden/>
            {getMessagesStatus === REQUEST_STATUS.LOADING && <Loader/>}
            {messages && messages.sent.map(message => <p>{message.content}</p>)}
        </div>
    );
};

const mapStateToProps = (state) => ({
    modalState: state.common.modalState,
    messages: state.common.messages,
    getMessagesStatus: state.common.getMessagesStatus,
    newMessageForm: state.common.newMessageForm,
    sendMessageStatus: state.common.sendMessageStatus,
    setReadMessageStatus: state.common.setReadMessageStatus
});

const mapDispatchToProps = (dispatch) => ({
    getMessages: () => dispatch(commonActions.getMessages()),
    sendMessage: () => dispatch(commonActions.sendMessage()),
    setMessageRead: (id) => dispatch(commonActions.setMessageRead(id)),
    inputChange: (id, value) => dispatch(commonActions.newMessageInputChange(id, value)),
    modalStateChange: (modalState) => dispatch(commonActions.newMessageModalStateChange(modalState))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Messaging));