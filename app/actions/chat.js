// @flow
import type { Dispatch } from '../reducers/types';
import api from '../service/api';

export const SET_ONLINE_USERS = 'SET_ONLINE_USERS';
export const SET_NEW_USER = 'SET_NEW_USER';
export const GET_CHAT_HISTORY = 'GET_CHAT_HISTORY';
export const SET_CHAT_HISTORY = 'SET_CHAT_HISTORY';
export const SET_SELECTED_USER = 'SET_SELECTED_USER';
export const SET_USER_OFFLINE = 'SET_USER_OFFLINE';
export const ADD_CHAT_HISTORY = 'ADD_CHAT_HISTORY';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SET_BACKGROUND_MODE = 'SET_BACKGROUND_MODE';

export function setOnlineUsers(users: Array<any>) {
  return {
    type: SET_ONLINE_USERS,
    users
  };
}

export function setNewUser(user: string) {
  return {
    type: SET_NEW_USER,
    user
  };
}

export function setSelectedUser(user: string) {
  return {
    type: SET_SELECTED_USER,
    user
  };
}

export function setUserOffline(user: string) {
  return {
    type: SET_USER_OFFLINE,
    user
  };
}

export function setChatHistory(chatHistory: Array<any>) {
  return {
    type: SET_CHAT_HISTORY,
    chatHistory
  };
}

export function getChatHistory(user: string) {
  return (dispatch: Dispatch) => {
    dispatch(setSelectedUser(user));
    api
      .getChatHistory(user)
      .then(res => res.json())
      .then(data => dispatch(setChatHistory(data)))
      .catch(err => {
        console.log(err);
      });
  };
}

export function addChatHistory(message: Object, groupId: string) {
  return {
    type: ADD_CHAT_HISTORY,
    message,
    groupId
  };
}

export function sendMessage(
  message: Object,
  groupId: string,
  senderId: string,
  receiverId: string
) {
  return {
    type: SEND_MESSAGE,
    groupId,
    message,
    senderId,
    receiverId
  };
}

export function setBackgroundMode(isBackground: boolean) {
  return {
    type: SET_BACKGROUND_MODE,
    isBackground
  };
}
