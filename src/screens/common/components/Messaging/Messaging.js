import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Header, Divider, Loader, Button, Card, Dimmer, List } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import commonActions from '../../common.actions';
import { MODAL_STATES, REQUEST_STATUS } from '../../../../utils/consts';
import ModalNewMessage from '../Modals/ModalNewMessage';
import './Messaging.scss';


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
    
    useEffect(() => {}, [messages]);

    console.log(messages.sent)
    
    const renderModals = () => {
        return (
            <ModalNewMessage
                isOpen={modalState === MODAL_STATES.NEW_MESSAGE}
                form={newMessageForm}
                loading={sendMessageStatus === REQUEST_STATUS.LOADING}
                onChange={(id, type, value) => props.inputChange(id, type, value)}
                onCancel={() => props.modalStateChange(MODAL_STATES.CLOSED)}
                onSend={props.sendMessage}
            />
        )
    }
    // TODO falta el checkbox para set read
    return (
        <div className='section-container'>
            {renderModals()}
            <div className='section-header-container'>
                <Header floated='left'>{I18n.t('common.messaging.titles.header')}</Header>
                <Header floated='right'>
                    <Button color='teal' onClick={() => props.modalStateChange(MODAL_STATES.NEW_MESSAGE)}>
                        {I18n.t('common.messaging.buttons.newMessage')}
                    </Button>
                </Header>
            </div>
            <Card>
                <Dimmer active={getMessagesStatus === REQUEST_STATUS.LOADING} inverted><Loader/></Dimmer>
                <Card.Content>
                    <Card.Header>{I18n.t('common.messaging.titles.recieved')}</Card.Header>
                </Card.Content>
                <Card.Content>
                    {messages && messages.received.length === 0 ? 
                        <div>
                            <p>Sin mensajes</p>
                        </div>
                        :
                        <List>
                            {/* contents: null
                                id: 560
                                notification: false
                                readFlag: false
                                receiver: {id: 510, email: "admin@admin.com",…}
                                sender: {id: 559, email: "riccijuanga@gmail.com",…}
                                subject: "pete" */}
                            {messages.received.map(message => (
                                <List.Item>
                                    <List.Icon name='mail' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header>{message.subject}</List.Header>
                                        <List.Description>
                                            <div className='message-description-container'>
                                                <p className='bold'>{`${I18n.t('common.messaging.sender')}: `}</p>
                                                <p>{message.sender ? message.sender.email : "Sistema"}</p>
                                            </div>
                                            <div className='message-description-container'>
                                                <p>{message.contents}</p>
                                            </div>
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                    }
                </Card.Content>
            </Card>
            <Card>
                <Dimmer active={getMessagesStatus === REQUEST_STATUS.LOADING} inverted><Loader/></Dimmer>
                <Card.Content>
                    <Card.Header>{I18n.t('common.messaging.titles.sent')}</Card.Header>
                </Card.Content>
                <Card.Content>
                    {messages && messages.sent.length === 0 ? 
                        <div>
                            <p>Sin mensajes</p>
                        </div>
                        :
                        <List>
                            {/* contents: null
                                id: 560
                                notification: false
                                readFlag: false
                                receiver: {id: 510, email: "admin@admin.com",…}
                                sender: {id: 559, email: "riccijuanga@gmail.com",…}
                                subject: "pit" */}
                            {messages.sent.map(message => (
                                <List.Item>
                                    <List.Icon name='mail' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header>{message.subject}</List.Header>
                                        <List.Description>
                                            <div className='message-description-container'>
                                                <p className='bold'>{`${I18n.t('common.messaging.receiver')}: `}</p>
                                                <p>{message.receiver.email}</p>
                                            </div>
                                        </List.Description>
                                        <List.Description>{message.contents}</List.Description>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                    }
                </Card.Content>
            </Card>
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
    inputChange: (id, type, value) => dispatch(commonActions.newMessageInputChange(id, type, value)),
    modalStateChange: (modalState) => dispatch(commonActions.newMessageModalStateChange(modalState))
});

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);