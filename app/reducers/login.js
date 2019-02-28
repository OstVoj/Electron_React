// @flow
import PropTypes from 'prop-types';
import {
  SET_LOADING,
  GET_SETTING_SUCCESS,
  GET_SETTING_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_LOADER_SUCCESS,
  GET_LOADER_FAILED
} from '../actions/login';
import type { Action } from './types';

export default function login(
  state: PropTypes.object = {
    loginCompleted: true,
    getSettingCompleted: true,
    setting: null,
    auth: null,
    loader: null
  },
  action: Action
) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loginCompleted: true,
        setting: state.setting,
        auth: action.auth
      };
    case SET_LOADING:
      return {
        loginCompleted: false,
        getSettingCompleted: false,
        setting: state.setting,
        auth: state.auth
      };
    case GET_SETTING_SUCCESS:
      return {
        getSettingCompleted: true,
        setting: action.setting,
        auth: null
      };
    case GET_SETTING_FAILED:
      return {
        getSettingCompleted: true,
        setting: { error: 1 },
        auth: null
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
        loader: action.loader
      };
    case GET_LOADER_FAILED:
      return {
        setting: state.setting,
        auth: state.auth,
        loader: null
      };
    default:
      return state;
  }
}
