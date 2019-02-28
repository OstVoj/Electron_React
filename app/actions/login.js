// @flow
import type { Dispatch } from '../reducers/types';
import api from '../service/api';

export const SET_LOADING = 'SET_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const GET_SETTING_SUCCESS = 'GET_SETTING_SUCCESS';
export const GET_SETTING_FAILED = 'GET_SETTING_FAILED';
export const PING_REQUESTED = 'PING_REQUESTED';
export const GET_LOADER_SUCCESS = 'GET_LOADER_SUCCESS';
export const GET_LOADER_FAILED = 'GET_LOADER_FAILED';

export function setLoading(loading: boolean) {
  return {
    type: SET_LOADING,
    loading
  };
}

export function setSetting(setting: void) {
  return {
    type: GET_SETTING_SUCCESS,
    setting
  };
}

export function setSettingFailure() {
  return {
    type: GET_SETTING_FAILED
  };
}

export function setAuthenticationFailure() {
  return {
    type: LOGIN_FAILED
  };
}

export function setAuthentication(auth: void) {
  return {
    type: LOGIN_SUCCESS,
    auth
  };
}

export function setLoaderSuccess(loader: void) {
  return {
    type: GET_LOADER_SUCCESS,
    loader
  };
}

export function setLoaderFailed() {
  return {
    type: GET_LOADER_FAILED
  };
}

export function getSetting(userId: string, companyId: string) {
  return (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    api
      .getSetting(userId, companyId)
      .then(res => res.json())
      .then(data => dispatch(setSetting(data)))
      .catch(err => {
        console.log(err);
        dispatch(setLoading(false));
      });
  };
}

export function login(
  httpHost: string,
  userId: string,
  password: string,
  companyId: string,
  machineId: string
) {
  return (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    api
      .login(userId, password, companyId, machineId, httpHost)
      .then(res => res.json())
      .then(data => {
        const auth = data;
        auth.userId = userId;
        auth.companyId = companyId;
        auth.machineId = machineId;
        auth.password = password;
        return dispatch(setAuthentication(auth));
      })
      .catch(err => {
        console.log(err);
        dispatch(setLoading(false));
        dispatch(setAuthenticationFailure());
      });
  };
}

export function ping(
  httpHost: string,
  userId: string,
  password: string,
  companyId: string,
  machineId: string
) {
  api
    .ping(httpHost, userId, password, companyId, machineId)
    .then(res => res.json())
    // eslint-disable-next-line promise/always-return
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  return {
    type: PING_REQUESTED
  };
}

export function getLoader(
  httpHost: string,
  userId: string,
  password: string,
  companyId: string
) {
  return (dispatch: Dispatch) => {
    api
      .getLoader(httpHost, userId, password, companyId)
      .then(res => res.json())
      .then(data => dispatch(setLoaderSuccess(data)))
      .catch(err => {
        console.log(err);
        return dispatch(setLoaderFailed());
      });
  };
}
