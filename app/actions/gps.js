// @flow
import api from '../service/api';
import logger from '../utils/logger';

export const SET_GPS = 'SET_GPS';
export const SET_SERIAL_PORTS = 'SET_SERIAL_PORTS';
export const SEND_GPS = 'SEND_GPS';

export function setGps(gps: Object) {
  return {
    type: SET_GPS,
    gps
  };
}

export function setSerialPorts(serialPorts: Array<string>) {
  return {
    type: SET_SERIAL_PORTS,
    serialPorts
  };
}

export function sendGps(lat: number, lon: number, speed: number) {
  api
    .sendGps(lat, lon, speed)
    .then(res => res.json())
    .then(data => {
      if (data.success === '1') {
        logger.log(
          `Sent the position update to server: LAT: ${lat}; LON: ${lon}; SPEED: ${speed}`
        );
      } else {
        logger.log(
          `Failed to send the coordinates: SUCCESS: ${
            data.success
          }; LAT: ${lat}; LON: ${lon}; SPEED: ${speed}`
        );
      }
      return true;
    })
    .catch(err => {
      console.log(err);
      logger.log(
        `Failed to send the coordinates: LAT: ${lat}; LON: ${lon}; SPEED: ${speed}`
      );
    });
  return {
    type: SEND_GPS
  };
}
