// @flow
import PropTypes from 'prop-types';
import get from 'lodash.get';
import {
  SET_ONLINE_USERS,
  SET_NEW_USER,
  SET_SELECTED_USER,
  SET_CHAT_HISTORY,
  SET_USER_OFFLINE,
  ADD_CHAT_HISTORY,
  SEND_MESSAGE,
  SET_BACKGROUND_MODE
} from '../actions/chat';
import type { Action } from './types';

const moment = require('moment');

export default function chat(
  state: PropTypes.object = {
    users: [],
    selectedUser: null,
    chatHistory: [],
    unreadMessages: [],
    isBackground: false
  },
  action: Action
) {
  switch (action.type) {
    case SET_ONLINE_USERS:
      return {
        users: action.users,
        selectedUser: state.selectedUser,
        chatHistory: state.chatHistory,
        unreadMessages: state.unreadMessages
      };
    case SET_NEW_USER:
      const { users } = state;
      const find = users.find(item => item === action.user);
      if (!find) {
        users.push(action.user);
      }

      return {
        users,
        selectedUser: state.selectedUser,
        chatHistory: state.chatHistory,
        unreadMessages: state.unreadMessages
      };
    case SET_CHAT_HISTORY:
      return {
        users: state.users,
        selectedUser: state.selectedUser,
        chatHistory: action.chatHistory,
        unreadMessages: state.unreadMessages
      };
    case SET_SELECTED_USER:
      const { unreadMessages } = state;
      unreadMessages[action.user] = null;

      return {
        users: state.users,
        selectedUser: action.user,
        chatHistory: state.chatHistory,
        unreadMessages
      };
    case SET_USER_OFFLINE:
      const userList = state.users;
      const { user } = action;

      const currentUser = state.selectedUser;
      let selectedUser = currentUser;
      let { chatHistory } = state;
      if (user === currentUser) {
        selectedUser = null;
        chatHistory = null;
      }
      const currentUsers = userList.filter(item => item !== user);

      return {
        users: currentUsers,
        selectedUser,
        chatHistory,
        unreadMessages: state.unreadMessages
      };
    case ADD_CHAT_HISTORY:
      const { message } = action;
      const selectedUserId = state.selectedUser;
      const history = state.chatHistory;
      const { chatId, cid, isGroupChat, sender, time } = message;
      const chatMessage = message.message;
      const { groupId } = action;

      const newMessage = {
        chatId,
        messageOutput: chatMessage,
        user: sender,
        time,
        showTime: moment.unix(time / 1000).format('YYYY-MM-DD HH:mm:ss')
      };
      const unreads = state.unreadMessages;
      let unreadCount = 0;

      if (
        !isGroupChat &&
        (sender === selectedUserId || chatId === selectedUserId)
      ) {
        history.push(newMessage);
        if (state.isBackground) {
          unreadCount = get(unreads, sender);
          unreads[sender] = unreadCount ? unreadCount + 1 : 1;
        }
      } else if (isGroupChat && groupId === selectedUserId) {
        history.push(newMessage);
        if (state.isBackground) {
          unreadCount = get(unreads, groupId);
          unreads[groupId] = unreadCount ? unreadCount + 1 : 1;
        }
      } else if (isGroupChat) {
        unreadCount = get(unreads, groupId);
        unreads[groupId] = unreadCount ? unreadCount + 1 : 1;
      } else {
        unreadCount = get(unreads, sender);
        unreads[sender] = unreadCount ? unreadCount + 1 : 1;
      }

      return {
        users: state.users,
        selectedUser: state.selectedUser,
        chatHistory: history,
        unreadMessages: unreads
      };
    case SEND_MESSAGE:
      const { senderId, receiverId } = action;
      const sendMessage = action.message;
      const currentGroupId = action.groupId;
      const currentTime = new Date().getTime();
      const { socket } = window;

      socket.core.emit('newMessage', {
        message: sendMessage,
        isGroupChat: currentGroupId === receiverId,
        time: currentTime,
        chatId: receiverId
      });

      return {
        users: state.users,
        selectedUser: state.selectedUser,
        chatHistory: state.chatHistory,
        unreadMessages: state.unreadMessages
      };
    case SET_BACKGROUND_MODE:
      return {
        users: state.users,
        selectedUser: state.selectedUser,
        chatHistory: state.chatHistory,
        unreadMessages: state.unreadMessages,
        isBackground: action.isBackground
      };
    default:
      return state;
  }
}
