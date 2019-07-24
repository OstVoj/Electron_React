/* eslint-disable no-nested-ternary */
// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cotainer from '../sections/Container';
import Fieldset from '../sections/Fieldset';
import Col from '../sections/Col';
import Row from '../sections/Row';
import HorizontalInput from '../inputs/HorizontalInput';
import Input from '../inputs/Input';

type Props = {
  gpsStore: any
};

class GpsPositionStatistics extends Component<Props> {
  props: Props;

  getSatellites = () => {
    const { gpsStore } = this.props;
    const { gps } = gpsStore;
    let result = '';
    if (gps) {
      const { satsVisible, satsActive } = gps;
      if (satsActive && satsVisible) {
        satsActive.map((item: any) => {
          const sats = satsVisible.filter(sat => sat.prn === item);
          sats.map((sat: any) => {
            result += `PRN: ${sat.prn} SNR: ${sat.snr}\n`;
            return 1;
          });
          return 1;
        });
        satsVisible.filter((sat: any) => {
          const { prn } = sat;
          if (!satsActive.includes(prn)) {
            result += `PRN: ${sat.prn} SNR: ${sat.snr}\n`;
          }
          return 1;
        });
      }
    }
    return result;
  };

  render() {
    const { gpsStore } = this.props;
    const { gps, serialPorts } = gpsStore;

    return (
      <Cotainer column>
        <Row>
          <Col w={50}>
            <Fieldset legend="Lat / Lon">
              <HorizontalInput
                type="text"
                name="latitude"
                label="Latitude"
                value={gps ? gps.lat : ''}
                readOnly
              />
              <br />
              <HorizontalInput
                type="text"
                name="latitude"
                label="Longitude"
                value={gps ? gps.lon : ''}
                readOnly
              />
              <br />
              <HorizontalInput
                type="text"
                name="datum"
                label="Datum"
                readOnly
              />
            </Fieldset>
            <br />
            <Fieldset legend="Altitude">
              <HorizontalInput
                type="text"
                name="metersSeaLevel"
                value={gps ? gps.alt : ''}
                label="Meters over mean sea level"
                readOnly
              />
            </Fieldset>
          </Col>
          <Col w={50} m p>
            <Fieldset legend="Com port">
              <HorizontalInput
                type="text"
                name="serialPort"
                value={
                  serialPorts
                    ? serialPorts.length > 0
                      ? serialPorts[0].comName
                      : ''
                    : ''
                }
                label="Serial Port"
                readOnly
              />
              <br />
              <HorizontalInput
                type="text"
                name="baudRate"
                value={serialPorts ? (serialPorts.length > 0 ? 4800 : '') : ''}
                label="Baud rate"
                readOnly
              />
            </Fieldset>
            <br />
            <Fieldset legend="Movement">
              <HorizontalInput
                type="text"
                name="speed"
                value={gps ? gps.speed / 1.609344 : ''}
                label="Speed(mph)"
                readOnly
              />
              <br />
              <HorizontalInput
                type="text"
                name="heading"
                value={gps ? gps.track : ''}
                label="Heading"
                readOnly
              />
            </Fieldset>
            <br />
            <Fieldset legend="Satellites">
              <Input
                type="textarea"
                name="satellites"
                rows="5"
                value={this.getSatellites()}
                readOnly
              />
            </Fieldset>
          </Col>
        </Row>
      </Cotainer>
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    gpsStore: state.gps,
    ...this.props
  };
}

export default connect(mapStateToProps)(GpsPositionStatistics);
