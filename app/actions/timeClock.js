// @flow
import type { Dispatch } from '../reducers/types';
import api from '../service/api';

const fs = require('fs');

export const GET_LAST_TIME_CLOCK_ENTRY_REQUEST =
  'GET_LAST_TIME_CLOCK_ENTRY_REQUEST';
export const GET_LAST_TIME_CLOCK_ENTRY_SUCCESS =
  'GET_LAST_TIME_CLOCK_ENTRY_SUCCESS';
export const GET_LAST_TIME_CLOCK_ENTRY_FAILED =
  'GET_LAST_TIME_CLOCK_ENTRY_FAILED';
export const UPLOAD_TIME_CLOCK_REQUEST = 'UPLOAD_TIME_CLOCK_REQUEST';
export const UPLOAD_TIME_CLOCK_SUCCESS = 'UPLOAD_TIME_CLOCK_SUCCESS';
export const UPLOAD_TIME_CLOCK_FAILED = 'UPLOAD_TIME_CLOCK_FAILED';

export function setLoading(loading: boolean) {
  return {
    type: UPLOAD_TIME_CLOCK_REQUEST,
    loading
  };
}

export function getLastTimeClockEntry(
  httpHost: string,
  userId: string,
  password: string,
  companyId: string
) {
  return (dispatch: Dispatch) => {
    api
      .getLastTimeClockEntry(httpHost, userId, password, companyId)
      .then(res => res.json())
      .then(data => dispatch(getLastTimeClockEntrySuccess(data)))
      .catch(err => {
        console.log(err);
        return dispatch(getLastTimeClockEntryFailed());
      });
  };
}

export function uploadTimeClock(
  httpHost: string,
  userId: string,
  password: string,
  companyId: string,
  lat: number,
  lon: number,
  imagePath: string,
  io: number
) {
  return (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    const form = new FormData();
    form.append('userId', userId);
    form.append('password', password);
    form.append('cid', companyId);
    form.append('lat', `${lat}`);
    form.append('lon', `${lon}`);
    form.append('io', `${io}`);
    const contents = fs.readFileSync(imagePath);
    const blob = new Blob([contents], { type: 'image/jpg' });
    form.append('uploadedfile', blob, 'image.jpg');
    api
      .uploadTimeClock(httpHost, form)
      .then(res => res.json())
      .then(() => dispatch(uploadTimeClockSuccess()))
      .catch(err => {
        console.log(err);
        return dispatch(uploadTimeClockFailed());
      });
  };
}

export function getLastTimeClockEntrySuccess(entry: void) {
  return {
    type: GET_LAST_TIME_CLOCK_ENTRY_SUCCESS,
    entry
  };
}

export function getLastTimeClockEntryFailed() {
  return {
    type: GET_LAST_TIME_CLOCK_ENTRY_FAILED
  };
}

export function uploadTimeClockSuccess(entry: void) {
  return {
    type: UPLOAD_TIME_CLOCK_SUCCESS,
    entry
  };
}

export function uploadTimeClockFailed() {
  return {
    type: UPLOAD_TIME_CLOCK_FAILED
  };
}
