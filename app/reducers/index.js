// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import login from './login';
import timeClock from './timeClock';
import tab from './tab';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    login,
    timeClock,
    tab
  });
}
