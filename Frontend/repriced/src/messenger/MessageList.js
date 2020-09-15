import React from 'react';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import { messengerActions, userActions } from '../_actions';
import { isEqual, debounce } from 'lodash';
import { Button } from 'react-bootstrap';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: 'hidden',
      messages: [],
    }
    this.dumbRef = React.createRef();
    this.messages = this.messages.bind(this);
    this.topMessageVisibilityChanged = this.topMessageVisibilityChanged.bind(this);
  }

  topMessageVisibilityChanged(isVisible) {
    if (this.props.priorConversation && this.state.visibility === 'visible' && isVisible && this.props.messagesListResponse.nextCursor !== null)
      this.props.getMessages(this.props.priorConversation.id, this.props.messagesListResponse.nextCursor, 20);
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.messagesListResponse, this.props.messagesListResponse)) {
      const temp = this.state.messages;
      this.setState({
        messages: [
          ...this.props.messagesListResponse.messages,
          ...this.state.messages
        ]
      }, () => {
        if (temp.length === 0) {
          this.dumbRef.current.scrollIntoView({ block: 'end', behavior: 'auto' });
        }
        this.setState({ visibility: 'visible' });
      });
    }
    if (!isEqual(prevProps.deliveredMessage, this.props.deliveredMessage)) {
      this.setState({ messageInput: '' });
      this.setState(state => {
        state.messages.push(this.props.deliveredMessage);
      }, () => {
        this.dumbRef.current.scrollIntoView({ block: 'end', behavior: 'auto' });
      })
    }
    if (!isEqual(prevProps.incomingMessage, this.props.incomingMessage)) {
      if (this.props.priorConversation && this.props.incomingMessage.conversation_id === this.props.priorConversation.id)
        this.setState(state => {
          state.messages.push(this.props.incomingMessage);
        }, () => {
          this.toScrollAfterRender = true;
        });
      else {
        this.props.getConversationList();
      }
    }
    if (this.props.priorConversationLoading
      && prevProps.priorConversationLoading !== this.props.priorConversationLoading) {
      this.setState({ visibility: 'hidden' }, () => {
        this.setState({ messages: [] });
      })
    }
    if(this.toScrollAfterRender) {
      this.toScrollAfterRender = false;
    }
  }
 
  messages() {
    let messages;
    if (this.state.messages) {
      messages = this.state.messages.map(message => {
        if (message.user_id === this.props.authenticatedUser.id) {
          return (
            <div className="row" key={message.id}>
              <div className="col-4 offset-8">
                <div style={{
                  margin: 3, padding: 10, paddingTop: 7, paddingBottom: 7, backgroundColor: '#0c8cff',
                  textAlign: 'right', float: 'right', borderRadius: 25
                }} className="text-white">
                  {message.text}
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div className="row" key={message.id}>
              <div className="col-4">
                <div style={{
                  margin: 3, padding: 10, paddingTop: 7, paddingBottom: 7, backgroundColor: '#c5d0d9',
                  textAlign: 'left', float: 'left', borderRadius: 25
                }} className=" text-black text-left">
                  {message.text}
                </div>
              </div>
            </div>
          )
        }
      });
      return messages;
    }
  }
  render() {
    let { visibility } = this.state;
    return (
        <div id="messagesDiv" className="col-9 h-100" style={{
          visibility,
          overflowY: 'scroll',
        }}>
          <VisibilitySensor offset={{ top: 60 }} onChange={this.topMessageVisibilityChanged}>
            <div name='dumbTop' style={{ marginBottom: '0' }}>
              <hr></hr>
            </div>
          </VisibilitySensor>
          {this.messages()}
          <div ref={this.dumbRef}></div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    incomingMessage,
    deliveredMessage,
    priorConversation,
    loadingMessagesPage,
    messagesListResponse,
    priorConversationLoading,
  } = state.messenger;

  const { authenticatedUser } = state.users;

  return {
    incomingMessage,
    deliveredMessage,
    priorConversation,
    authenticatedUser,
    loadingMessagesPage,
    messagesListResponse,
    priorConversationLoading,
  };
}

const mapActionToProps = {
  sendMessage: messengerActions.sendMessage,
  getChat: messengerActions.getChat,
  getConversationList: messengerActions.getConversationList,
  getMessages: messengerActions.getMessages,
};

const connectedMessageList = connect(mapStateToProps, mapActionToProps)(MessageList);
export { connectedMessageList as MessageList };