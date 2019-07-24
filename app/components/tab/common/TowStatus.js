// @flow
import React, { Component } from 'react';
import get from 'lodash.get';
import styles from './TowStatus.css';
import Container from '../../sections/Container';
import Row from '../../sections/Row';
import RoundedSection from '../../sections/RoundedSection';
import Fieldset from '../../sections/Fieldset';
import Col from '../../sections/Col';

type Props = {
  onClose: () => void,
  towStatus: Object
};

export default class TowStatus extends Component<Props> {
  props: Props;

  onClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  getList = (records: Array) => {
    const result = records.map((record: Object) => (
      <tr key={record.recordId}>
        <td>{record.recordId}</td>
        <td>{record.violations}</td>
        <td>{record.date}</td>
        <td>{record.rollingWindowViolation}</td>
      </tr>
    ));

    return result;
  };

  render() {
    const { onClose, towStatus } = this.props;
    const rollingWindowDays = get(towStatus, 'rollingWindowDays');
    const maxCities = get(towStatus, 'maxCites');
    const isPlateSafe = get(towStatus, 'isPlateSafe');
    const records = get(towStatus, 'records');
    const canOfficerTow = get(towStatus, 'canOfficerTow');

    return (
      <Container column center>
        <div className={styles.form}>
          <Row>
            <Col w={50}>RECOMMENDATION FOR STATUS OF VEHICLE:</Col>
            <Col w={50}>
              {canOfficerTow !== '0' ? (
                <span>TOW</span>
              ) : (
                <span className={styles.tow}>DO NOT TOW</span>
              )}
            </Col>
          </Row>
          <Row m p>
            <RoundedSection>
              The recommendation for status of vehicle is based on information
              gathered from previous encounters along with guidelines set forth
              by the client such as safelist, tow after citation #, window of
              opportunity and parking permit status. This is only a suggestion.
              There maybe other factors involved such as the violation at hand
              such as if the vehicle is parked in a FIRE LANE or vehicle is
              parked in a manner that is may cause an accident. Below is the
              data that was used in determining the above recommendation.
              <br />
              The officer should review this information before making a final
              decision to tow the vehicle.
            </RoundedSection>
          </Row>
          <Row m p>
            <Col w={100}>
              <Fieldset legend="Citation and Safelist History">
                <table>
                  <thead>
                    <tr>
                      <th>Internal ID</th>
                      <th>Violation</th>
                      <th>Creation Date</th>
                      <th>In Window</th>
                    </tr>
                  </thead>
                  <tbody>{records && this.getList(records)}</tbody>
                </table>
              </Fieldset>
            </Col>
          </Row>
          <Row m p>
            <Col w={100}>
              <Fieldset legend="Citation Settings">
                <Row m p>
                  <Col w={33}>
                    TOW WINDOW:&nbsp;&nbsp;&nbsp;{rollingWindowDays} DAYS
                  </Col>
                  <Col w={33}>
                    TOW AFTER:&nbsp;&nbsp;&nbsp;{maxCities} CITIES
                  </Col>
                  <Col w={33}>
                    SAFELISTED:&nbsp;&nbsp;&nbsp;
                    {isPlateSafe !== '0' ? 'YES' : 'NO'}
                  </Col>
                </Row>
              </Fieldset>
            </Col>
          </Row>
        </div>
        <br />
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className="tab-container-button"
            onClick={this.onClose}
          >
            OK
          </button>
        </div>
      </Container>
    );
  }
}
