// @flow
import React, { Component } from 'react';
import { FadeLoader } from 'react-spinners';
import get from 'lodash.get';
import Container from '../../sections/Container';
import Fieldset from '../../sections/Fieldset';
import Row from '../../sections/Row';
import Col from '../../sections/Col';

type Props = {
  postOrderDetails: Object,
  isLoading: boolean
};

export default class PostOrderDetailsAlarmInfo extends Component<Props> {
  props: Props;

  render() {
    const { postOrderDetails, isLoading } = this.props;
    const alarmNotifyName = get(postOrderDetails, 'alarmNotifyName');
    const alarmNotifyPhone = get(postOrderDetails, 'alarmNotifyPhone');
    const keyIssuedName = get(postOrderDetails, 'keyIssuedName');
    const keyIssuedPhone = get(postOrderDetails, 'keyIssuedPhone');
    const monitorName = get(postOrderDetails, 'monitorName');
    const monitorPhone = get(postOrderDetails, 'monitorPhone');
    const alarmName = get(postOrderDetails, 'alarm_name');
    const alarmPhone = get(postOrderDetails, 'alarm_phone');
    const alarmAccountPassword = get(postOrderDetails, 'alarmPass');
    const gateCode = get(postOrderDetails, 'gateCode');
    const alarmArm = get(postOrderDetails, 'alarmArm');
    const alarmDisarm = get(postOrderDetails, 'alarmDisarm');

    return (
      <Container>
        <Row>
          <Col w={100}>
            <Fieldset legend="Alarm Information">
              {isLoading ? (
                <Row>
                  <Col justify="center">
                    <FadeLoader
                      sizeUnit="px"
                      size={150}
                      color="#ffffff"
                      loading={isLoading}
                    />
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col>
                    <Row m p>
                      <Col>Alarm Notification Contact:</Col>
                      <Col>{alarmNotifyName}</Col>
                    </Row>
                    <Row m p>
                      <Col>Keys Issued To:</Col>
                      <Col>{keyIssuedName}</Col>
                    </Row>
                    <Row m p>
                      <Col>Monitoring Station Name:</Col>
                      <Col>{monitorName}</Col>
                    </Row>
                    <Row m p>
                      <Col>Alarm Company Name:</Col>
                      <Col>{alarmName}</Col>
                    </Row>
                    <Row m p>
                      <Col>Alarm Account Password:</Col>
                      <Col>{alarmAccountPassword}</Col>
                    </Row>
                    <Row m p>
                      <Col>Alarm "Arm" Code:</Col>
                      <Col>{alarmArm}</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row m p>
                      <Col>Phone:</Col>
                      <Col>{alarmNotifyPhone}</Col>
                    </Row>
                    <Row m p>
                      <Col>Keys Issued To - Phone:</Col>
                      <Col>{keyIssuedPhone}</Col>
                    </Row>
                    <Row m p>
                      <Col>Monitoring Station Phone:</Col>
                      <Col>{monitorPhone}</Col>
                    </Row>
                    <Row m p>
                      <Col>Alarm Company Phone:</Col>
                      <Col>{alarmPhone}</Col>
                    </Row>
                    <Row m p>
                      <Col>Property Gate Code:</Col>
                      <Col>{gateCode}</Col>
                    </Row>
                    <Row m p>
                      <Col>Alarm Disarm Code:</Col>
                      <Col>{alarmDisarm}</Col>
                    </Row>
                  </Col>
                </Row>
              )}
            </Fieldset>
          </Col>
        </Row>
      </Container>
    );
  }
}
