// @flow
import type { Dispatch } from '../reducers/types';
import api from '../service/api';
import logger from '../utils/logger';

export const SET_LOADING = 'SET_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const GET_SETTING_SUCCESS = 'GET_SETTING_SUCCESS';
export const GET_SETTING_FAILED = 'GET_SETTING_FAILED';
export const PING_REQUESTED = 'PING_REQUESTED';
export const GET_LOADER_SUCCESS = 'GET_LOADER_SUCCESS';
export const GET_LOADER_FAILED = 'GET_LOADER_FAILED';
export const SET_GPS = 'SET_GPS';
export const SET_STATUS = 'SET_STATUS';
export const SET_ONLINE_STATUS = 'SET_ONLINE_STATUS';

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

export function ping(machineId: string) {
  return (dispatch: Dispatch) => {
    let responseStatus = 0;
    api
      .ping(machineId)
      .then(res => {
        responseStatus = res.status;
        return res.json();
      })
      .then(data => {
        if (responseStatus === 401 && data.tokenExpired) {
          dispatch(setOnlineStatus('NO'));
          return dispatch(setStatus(responseStatus));
        }
        if (responseStatus !== 200) {
          logger.log(
            'Unable to connect to insert ping. Setting isConnected to NO'
          );
          return dispatch(setOnlineStatus('NO'));
        }
        if (responseStatus === 200 && data.success !== '1') {
          logger.log(
            `Ping success is ${data.success}. Setting isConnected to NO`
          );
          return dispatch(setOnlineStatus('NO'));
        }
        return dispatch(setOnlineStatus('YES'));
      })
      .catch(err => {
        console.log(err);
        logger.log(
          'Unable to connect to insert ping. Setting isConnected to NO'
        );
        return dispatch(setOnlineStatus('NO'));
      });
  };
}

export function getLoader() {
  return (dispatch: Dispatch) => {
    api
      .getLoader()
      .then(res => res.json())
      .then(data => dispatch(setLoaderSuccess(data)))
      .catch(err => {
        console.log(err);
        return dispatch(setLoaderFailed());
      });
  };
}

export function setGps(lat: number, lon: number) {
  const gps = {
    lat,
    lon
  };
  return {
    type: SET_GPS,
    gps
  };
}

export function setStatus(status: any) {
  return {
    type: SET_STATUS,
    status
  };
}

export function setOnlineStatus(onlineStatus: any) {
  return {
    type: SET_ONLINE_STATUS,
    onlineStatus
  };
}

export function changeStatus(status: string, lat: string, lon: string) {
  return (dispatch: Dispatch) => {
    let responseStatus = 0;
    api
      .setStatus(status, lat, lon)
      .then(res => {
        responseStatus = res.status;
        return res.json();
      })
      .then(data => {
        if (responseStatus === 401 && data.tokenExpired) {
          return dispatch(setStatus(401));
        }
        return dispatch(setStatus(status));
      })
      .catch(err => dispatch(setStatus(false)));
  };
}
