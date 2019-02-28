// @flow
import PropTypes from 'prop-types';
import {
  GET_LAST_TIME_CLOCK_ENTRY_REQUEST,
  GET_LAST_TIME_CLOCK_ENTRY_SUCCESS,
  GET_LAST_TIME_CLOCK_ENTRY_FAILED,
  UPLOAD_TIME_CLOCK_REQUEST,
  UPLOAD_TIME_CLOCK_SUCCESS,
  UPLOAD_TIME_CLOCK_FAILED
} from '../actions/timeClock';
import type { Action } from './types';

export default function timeClock(
  state: PropTypes.object = {
    getLastTimeClockEntryCompleted: true,
    entry: null,
    timeClockUploaded: true
  },
  action: Action
) {
  switch (action.type) {
    case UPLOAD_TIME_CLOCK_REQUEST:
      return {
        getLastTimeClockEntryCompleted: true,
        entry: state.entry,
        timClockUploaded: false
      };
    case GET_LAST_TIME_CLOCK_ENTRY_SUCCESS:
      return {
        getLastTimeClockEntryCompleted: true,
        entry: action.entry,
        timeClockUploaded: true
      };
    case GET_LAST_TIME_CLOCK_ENTRY_FAILED:
      return {
        getLastTimeClockEntryCompleted: true,
        entry: null,
        timeClockUploaded: true
      };
    case UPLOAD_TIME_CLOCK_SUCCESS:
      return {
        timeClockUploaded: true,
        entry: state.entry
      };
    case UPLOAD_TIME_CLOCK_FAILED:
      return {
        timeClockUploaded: true,
        entry: state.entry
      };
    default:
      return state;
  }
}
