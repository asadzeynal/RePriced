import React from 'react';
import { connect } from 'react-redux';
import { messengerActions, userActions } from '../_actions';
import { MessageList } from './MessageList';
import { isEqual, debounce } from 'lodash';
import { Button } from 'react-bootstrap';
import styles from './messenger.module.css';


class Messenger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChat: props.priorConversation,
        }
        this.handleChatClick = this.handleChatClick.bind(this);
        this.messageInput = this.messageInput.bind(this);
        this.onEnterPress = this.onEnterPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessageClicked = this.sendMessageClicked.bind(this);
        this.activeId = 1;
        this.visibility = 'hidden'
    }
    onEnterPress(event) {
        if (event.keyCode === 13 && event.shiftKey === false) {
            event.preventDefault();
            this.sendMessageClicked();
        }
    }
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    sendMessageClicked() {
        if (this.state.messageInput === undefined || this.state.messageInput === null
            || this.state.messageInput === '') {
            return;
        }
        const message = {
            text: this.state.messageInput,
            user_id: this.props.authenticatedUser.id,
            conversation_id: this.state.currentChat.id,
            created_at: new Date(),
            updated_at: new Date(),
        }
        this.props.sendMessage(message);
    }
    componentDidMount() {
        this.props.getConversationList();
    }
    messageInput(visibility) {
        const messageInput = <div className="row mt-2" style={{ visibility }}>
            <div className="col-7 offset-3">
                <textarea className="form-control" id="messageText" onChange={this.handleChange}
                    rows="1" name="messageInput" value={this.state.messageInput} onKeyDown={this.onEnterPress} style={{ height: 'auto', resize: 'none' }}></textarea>
            </div>
            <div className="col-2">
                <Button block onClick={this.sendMessageClicked}>Send</Button>
            </div>
        </div>
        return messageInput;
    }
    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.conversationList, this.props.conversationList)) {
            this.setState({ conversationList: this.props.conversationList });
            const conversation = this.props.conversationList[0];
            let user;
            if (conversation.user1 === null) {
                user = conversation.user2;
            } else {
                user = conversation.user1;
            }
            this.props.getChat(user.id);
        }
        if (!isEqual(prevProps.priorConversation, this.props.priorConversation)) {
            this.activeId = this.props.priorConversation.id;
            this.visibility = 'visible'
            if ((!prevProps.priorConversation && this.props.priorConversation) ||
                !isEqual(prevProps.priorConversation.id, this.props.priorConversation.id)) {
                this.props.getMessages(this.props.priorConversation.id, this.props.priorConversation.nextCursor, 15);
            }
            this.setState({ currentChat: this.props.priorConversation, });
        }
        if (!isEqual(prevProps.deliveredMessage, this.props.deliveredMessage)) {
            this.setState({ messageInput: '' });
            this.setState(state => {
                const chat = state.conversationList.find((chat) => chat.id === state.currentChat.id);
                chat.messages[0] = this.props.deliveredMessage;
            })
        }
        if (!isEqual(prevProps.incomingMessage, this.props.incomingMessage)) {
            if (this.state.currentChat && this.props.incomingMessage.conversation_id === this.state.currentChat.id)
                this.setState(state => {
                    const chat = state.conversationList.find((chat) => chat.id === state.currentChat.id);
                    chat.messages[0] = this.props.incomingMessage;
                });
            else {
                this.props.getConversationList();
            }
        }
    }

    handleChatClick(event) {
        event.preventDefault();
        const recieverId = event.currentTarget.dataset.index;
        if (this.state.currentChat && (this.state.currentChat.user_1_id === parseInt(recieverId) ||
            this.state.currentChat.user_2_id === parseInt(recieverId)))
            return;
        this.props.getChat(recieverId);
    };
    render() {
        if (this.props.authenticatedUser === undefined || this.props.authenticatedUser === null) {
            return null;
        }
        if (this.state.conversationList !== undefined && this.state.conversationList !== null)

            this.listItems = this.state.conversationList.map((conversation) => {
                if (conversation.user1 === null) {
                    conversation.user = conversation.user2;
                } else {
                    conversation.user = conversation.user1;
                }
                let className = 'list-group-item';
                let listMsgClassName = styles.listMsg;
                if (this.activeId === conversation.id) {
                    className += ' active';
                    listMsgClassName = styles.listMsgActive;
                }
                return <button className={className} style={{ marginBottom: 4 }} data-index={conversation.user.id} key={conversation.id} onClick={this.handleChatClick}>
                    <div className="row">
                        <div className="col-2 p-1"><img alt='thumbnail' className="rounded-circle" style={{
                            objectFit: 'cover',
                            overflow: 'hidden',
                            height: '4vw',
                            width: '4vw',
                        }} src={conversation.user.photo || 'https://www.misemacau.org/wp-content/uploads/2015/11/avatar-placeholder-01.png'}></img></div>
                        <div className="col-10"><p className="mb-1 pr-2" style={{ fontSize: 15 }}>
                            {conversation.user.firstName} {conversation.user.lastName}</p>
                            {conversation.messages[0] &&
                                <p className={listMsgClassName} style={{  }}>{conversation.messages[0].text.substring(0, 20)}</p>
                            }
                        </div>
                    </div>
                </button>;
            });

        return (
            <div className="container-fluid" style={{ overflow: 'hidden', minHeight: '100%' }}>
                <div className="row" style={{ height: '80vh' }} >
                    <div className="col-3 border-right" style={{ height: '100%', overflowY: 'scroll', }}>
                        <div className="row">
                            <div className="col">
                                <p style={{ fontSize: '33px', width: '100%' }} className="text-left">Chats</p>
                            </div>
                        </div>
                        <ul className="list-group">{this.listItems}</ul>
                    </div>
                    <MessageList></MessageList>
                </div>
                {this.messageInput(this.visibility)}
            </div >
        )

    }
}

function mapStateToProps(state) {
    const {
        incomingMessage,
        deliveredMessage,
        priorConversation,
        conversationList,
        loadingMessagesPage,
        messagesListResponse,
    } = state.messenger;

    const { authenticatedUser } = state.users;

    return {
        incomingMessage,
        deliveredMessage,
        priorConversation,
        conversationList,
        authenticatedUser,
        loadingMessagesPage,
        messagesListResponse,
    };
}

const mapActionToProps = {
    sendMessage: messengerActions.sendMessage,
    getChat: messengerActions.getChat,
    getConversationList: messengerActions.getConversationList,
    getMessages: messengerActions.getMessages,
};

const connectedMessenger = connect(mapStateToProps, mapActionToProps)(Messenger);
export { connectedMessenger as Messenger };