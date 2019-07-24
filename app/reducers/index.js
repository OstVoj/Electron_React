// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import login from './login';
import timeClock from './timeClock';
import tab from './tab';
import gps from './gps';
import chat from './chat';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    login,
    timeClock,
    tab,
    gps,
    chat
  });
}
