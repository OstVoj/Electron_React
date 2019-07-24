// @flow
import PropTypes from 'prop-types';
import { SET_GPS, SET_SERIAL_PORTS, SEND_GPS } from '../actions/gps';
import type { Action } from './types';

export default function gps(
  state: PropTypes.object = {
    gps: null,
    serialPorts: []
  },
  action: Action
) {
  switch (action.type) {
    case SET_GPS:
      return {
        gps: action.gps,
        serialPorts: state.serialPorts
      };
    case SET_SERIAL_PORTS:
      return {
        serialPorts: action.serialPorts
      };
    case SEND_GPS:
      return {
        gps: state.gps,
        serialPorts: state.serialPorts
      };
    default:
      return state;
  }
}
