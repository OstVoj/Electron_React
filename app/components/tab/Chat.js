// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash.get';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import * as ChatActions from '../../actions/chat';
import Container from '../sections/Container';
import Col from '../sections/Col';
import Row from '../sections/Row';
import styles from './Chat.css';
import BlinkEnvelope from './common/BlinkEnvelope';

const classNames = require('classnames');

fontawesome.library.add(faTimes);

type Props = {
  title: string,
  chatStore: Object,
  loginStore: Object,
  getChatHistory: (user: string) => void,
  setSelectedUser: (user: string) => void,
  sendMessage: (
    message: string,
    groupId: string,
    senderId: string,
    receiverId: string
  ) => void,
  setBackgroundMode: (isBackground: boolean) => void
};

type States = {
  message: string
};

class Chat extends Component<Props, States> {
  props: Props;

  state = {
    message: ''
  };

  componentDidMount() {
    this.scrollBottom();
    const { setBackgroundMode } = this.props;
    setBackgroundMode(false);
  }

  componentDidUpdate(prevProps: PropTypes.object) {
    this.scrollBottom();
  }

  componentWillUnmount() {
    const { setBackgroundMode } = this.props;
    setBackgroundMode(true);
  }

  scrollBottom = () => {
    const { chatStore } = this.props;
    const chatHistory = get(chatStore, 'chatHistory');
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');

    if (chatHistory && messagesDiv) {
      messagesDiv.scrollTop =
        messagesDiv.scrollHeight - messagesDiv.clientHeight;
      messageInput.focus();
    }
  };

  onChangeMessage = (e: PropTypes.object) => {
    this.setState({
      message: e.target.value
    });
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      const { message } = this.state;
      if (message) {
        const { sendMessage } = this.props;
        const { NODE_ENV } = process.env;
        const env = NODE_ENV === 'development' ? 'dev' : 'prod';
        const { loginStore, chatStore } = this.props;
        const { auth } = loginStore;
        const companyId = get(auth, 'companyId');
        const senderId = get(auth, 'userId');
        const receiverId = get(chatStore, 'selectedUser');

        sendMessage(message, `${env}-${companyId}`, senderId, receiverId);
        this.setState({
          message: ''
        });
      }
    }
  };

  getUsers = () => {
    const { chatStore } = this.props;
    const users = get(chatStore, 'users');
    const unreadMessages = get(chatStore, 'unreadMessages');

    return users.map(user => (
      <Row key={user}>
        <div className={styles.item} onClick={() => this.getChatHistory(user)}>
          {user}
          {unreadMessages[user] && <BlinkEnvelope />}
          <div className={styles.available} />
        </div>
      </Row>
    ));
  };

  renderChatHistory = (chatHistory: Array) => {
    const { chatStore } = this.props;
    const selectedUser = get(chatStore, 'selectedUser');

    return (
      chatHistory &&
      chatHistory.map(history => (
        <div
          className={classNames(
            styles.message,
            history.user !== selectedUser && styles.right
          )}
          key={history.showTime}
        >
          <div className={styles.author}>{history.user}</div>
          <div className={styles.bubble}>
            {history.messageOutput}
            <span>{history.showTime}</span>
          </div>
        </div>
      ))
    );
  };

  renderRight = () => {
    const { message } = this.state;
    const { chatStore, setSelectedUser } = this.props;
    const selectedUser = get(chatStore, 'selectedUser');
    const chatHistory = get(chatStore, 'chatHistory');

    let userName = selectedUser;
    if (selectedUser) {
      const { NODE_ENV } = process.env;
      const env = NODE_ENV === 'development' ? 'dev' : 'prod';
      const { loginStore } = this.props;
      const auth = get(loginStore, 'auth');
      const companyId = get(auth, 'companyId');
      if (userName === `${env}-${companyId}`) {
        userName = companyId;
      }
    }

    return (
      userName && (
        <div>
          <Row>
            <Col w={95} align="center" justify="center">
              <span className={styles.title}>{userName}</span>
            </Col>
            <Col w={5} align="center" justify="center">
              <span
                className={styles.title}
                onClick={() => setSelectedUser(null)}
              >
                <FontAwesomeIcon icon="times" />
              </span>
            </Col>
          </Row>
          <Row>
            <div className={styles.history} id="messages">
              {this.renderChatHistory(chatHistory)}
            </div>
          </Row>
          <Row>
            <input
              className={styles.input}
              type="text"
              onChange={this.onChangeMessage}
              value={message}
              placeholder="Send message..."
              id="messageInput"
              onKeyPress={this.handleKeyPress}
            />
          </Row>
        </div>
      )
    );
  };

  getChatHistory = (user: string) => {
    const { getChatHistory } = this.props;
    getChatHistory(user);
  };

  render() {
    const { NODE_ENV } = process.env;
    const env = NODE_ENV === 'development' ? 'dev' : 'prod';
    const { loginStore, chatStore } = this.props;
    const auth = get(loginStore, 'auth');
    const companyId = get(auth, 'companyId');
    const unreadMessages = get(chatStore, 'unreadMessages');

    return (
      <Container>
        <Col w={20}>
          <div className={styles.left}>
            <Row>
              <div
                className={styles.item}
                onClick={() => this.getChatHistory(`${env}-${companyId}`)}
              >
                {companyId}
                {unreadMessages[`${env}-${companyId}`] && <BlinkEnvelope />}
                <div className={styles.available} />
              </div>
            </Row>
            {this.getUsers()}
          </div>
        </Col>
        <Col w={80} m p>
          {this.renderRight()}
        </Col>
      </Container>
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    chatStore: state.chat,
    loginStore: state.login,
    ...this.props
  };
}

function mapDispatchToProps(dispatch: PropTypes.object) {
  return bindActionCreators(ChatActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
