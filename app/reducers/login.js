// @flow
import PropTypes from 'prop-types';
import {
  SET_LOADING,
  GET_SETTING_SUCCESS,
  GET_SETTING_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_LOADER_SUCCESS,
  GET_LOADER_FAILED,
  SET_STATUS,
  SET_ONLINE_STATUS
} from '../actions/login';
import type { Action } from './types';

const fetchDefaults = require('fetch-defaults');

export default function login(
  state: PropTypes.object = {
    loginCompleted: true,
    getSettingCompleted: true,
    setting: null,
    auth: null,
    loader: null,
    status: '',
    onlineStatus: ''
  },
  action: Action
) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { setting } = state;
      const { auth } = action;
      window.apiFetch = fetchDefaults(fetch, `https://${setting.httpHost}`, {
        headers: { tokenAuth: auth.token }
      });

      return {
        loginCompleted: true,
        setting: state.setting,
        auth: action.auth,
        status: state.status,
        onlineStatus: state.onlineStatus
      };
    case SET_LOADING:
      return {
        loginCompleted: false,
        getSettingCompleted: false,
        setting: state.setting,
        auth: state.auth,
        status: state.status,
        onlineStatus: state.onlineStatus
      };
    case GET_SETTING_SUCCESS:
      return {
        getSettingCompleted: true,
        setting: action.setting,
        auth: null,
        status: state.status,
        onlineStatus: state.onlineStatus
      };
    case GET_SETTING_FAILED:
      return {
        getSettingCompleted: true,
        setting: { error: 1 },
        auth: null,
        status: state.status,
        onlineStatus: state.onlineStatus
      };
    case LOGIN_FAILED:
      return {
        loginCompleted: true,
        setting: state.setting,
        auth: { success: '0', error: '' }
      };
    case GET_LOADER_SUCCESS:
      return {
        setting: state.setting,
        auth: state.auth,
        loader: action.loader,
        status: state.status,
        onlineStatus: state.onlineStatus
      };
    case GET_LOADER_FAILED:
      return {
        setting: state.setting,
        auth: state.auth,
        loader: null,
        status: state.status,
        onlineStatus: state.onlineStatus
      };
    case SET_STATUS:
      return {
        setting: state.setting,
        auth: state.auth,
        loader: state.loader,
        status: action.status ? action.status : state.status,
        onlineStatus: state.onlineStatus
      };
    case SET_ONLINE_STATUS:
      return {
        setting: state.setting,
        auth: state.auth,
        loader: state.loader,
        status: state.status,
        onlineStatus: action.onlineStatus
      };
    default:
      return state;
  }
}
