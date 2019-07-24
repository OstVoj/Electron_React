// @flow
import React, { Component } from 'react';
import CloseableTabs from 'react-closeable-tabs';
import Container from '../../sections/Container';
import Col from '../../sections/Col';
import Row from '../../sections/Row';
import Fieldset from '../../sections/Fieldset';
import HorizontalInput from '../../inputs/HorizontalInput';
import PostOrderDetailsAccountInfo from './PostOrderDetailsAccountInfo';
import PostOrderDetailsAlarmInfo from './PostOrderDetailsAlarmInfo';
import PostOrderDetailsLockdowns from './PostOrderDetailsLockdowns';
import PostOrderDetailsParking from './PostOrderDetailsParking';
import PostOrderDetailsComments from './PostOrderDetailsComments';
import PostOrderDetailsPatrolCoverageSchedule from './PostOrderDetailsPatrolCoverageSchedule';

type Props = {
  onClose: () => void,
  isLoading: boolean,
  postOrderDetails: Object
};

export default class PostOrderDetails extends Component<Props> {
  props: Props;

  render() {
    const { onClose, postOrderDetails, isLoading } = this.props;

    const postOrderDetailsAccountInfo = (
      <PostOrderDetailsAccountInfo
        postOrderDetails={postOrderDetails}
        isLoading={isLoading}
      />
    );
    const postOrderDetailsAlarmInfo = (
      <PostOrderDetailsAlarmInfo
        postOrderDetails={postOrderDetails}
        isLoading={isLoading}
      />
    );
    const postOrderDetailsLockdowns = (
      <PostOrderDetailsLockdowns
        postOrderDetails={postOrderDetails}
        isLoading={isLoading}
      />
    );
    const postOrderDetailsParking = (
      <PostOrderDetailsParking
        postOrderDetails={postOrderDetails}
        isLoading={isLoading}
      />
    );
    const postOrderDetailsComments = (
      <PostOrderDetailsComments
        postOrderDetails={postOrderDetails}
        isLoading={isLoading}
      />
    );
    const postOrderDetailsPatrolCoverageSchedule = (
      <PostOrderDetailsPatrolCoverageSchedule
        postOrderDetails={postOrderDetails}
        isLoading={isLoading}
      />
    );

    const tabData = [
      {
        tab: 'Account Info',
        component: postOrderDetailsAccountInfo,
        closeable: false,
        id: 0
      },
      {
        tab: 'Alarm Info',
        component: postOrderDetailsAlarmInfo,
        closeable: false,
        id: 1
      },
      {
        tab: 'Lockdowns',
        component: postOrderDetailsLockdowns,
        closeable: false,
        id: 2
      },
      {
        tab: 'Parking',
        component: postOrderDetailsParking,
        closeable: false,
        id: 3
      },
      {
        tab: 'Comments',
        component: postOrderDetailsComments,
        closeable: false,
        id: 4
      },
      {
        tab: 'Patrol/Coverage Schedule',
        component: postOrderDetailsPatrolCoverageSchedule,
        closeable: false,
        id: 5
      }
    ];

    return (
      <Container column center>
        <Row>
          <Col w={100}>
            <CloseableTabs
              tabPanelColor="#202124"
              data={tabData}
              tabPanelClass="tab-panel"
            />
          </Col>
        </Row>
        <Row>
          <Col w={80} justify="center">
            <button
              type="button"
              className="tab-container-button"
              onClick={() => onClose()}
            >
              Close
            </button>
          </Col>
          <Col w={20} justify="center">
            <button
              type="button"
              className="tab-container-button"
              onClick={() => onClose()}
            >
              Options
            </button>
          </Col>
        </Row>
      </Container>
    );
  }
}
