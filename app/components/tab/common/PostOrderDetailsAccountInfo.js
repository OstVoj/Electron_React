// @flow
import React, { Component } from 'react';
import { FadeLoader } from 'react-spinners';
import get from 'lodash.get';
import Container from '../../sections/Container';
import Row from '../../sections/Row';
import Col from '../../sections/Col';
import RoundedSection from '../../sections/RoundedSection';

type Props = {
  postOrderDetails: Object,
  isLoading: boolean
};

export default class PostOrderDetailsAccountInfo extends Component<Props> {
  props: Props;

  render() {
    const { postOrderDetails, isLoading } = this.props;
    const address = get(postOrderDetails, 'address');
    const city = get(postOrderDetails, 'city');
    const state = get(postOrderDetails, 'state');
    const zip = get(postOrderDetails, 'zip');
    const contact = get(postOrderDetails, 'contact');
    const maint_contact_name = get(postOrderDetails, 'maint_contact_name');
    const park_contact_name = get(postOrderDetails, 'park_contact_name');
    const phone = get(postOrderDetails, 'phone');
    const report_type = get(postOrderDetails, 'report_type');
    const maint_contact_phone1 = get(postOrderDetails, 'maint_contact_phone1');
    const maint_contact_phone2 = get(postOrderDetails, 'maint_contact_phone2');
    const pd_name = get(postOrderDetails, 'pd_name');
    const pd_phone = get(postOrderDetails, 'pd_phone');
    const park_contact_phone = get(postOrderDetails, 'park_contact_phone');

    return (
      <Container>
        <RoundedSection>
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
            postOrderDetails && (
              <Row>
                <Col>
                  <Row m p>
                    <Col>Address:</Col>
                    <Col>{address}</Col>
                  </Row>
                  <Row m p>
                    <Col>State:</Col>
                    <Col>{state}</Col>
                  </Row>
                  <Row m p>
                    <Col>Onsite Contact:</Col>
                    <Col>{contact}</Col>
                  </Row>
                  <Row m p>
                    <Col>Maint Contact:</Col>
                    <Col>{maint_contact_name}</Col>
                  </Row>
                  <Row m p>
                    <Col>Parking Contact:</Col>
                    <Col>{park_contact_name}</Col>
                  </Row>
                  <Row m p>
                    <Col>Local Police:</Col>
                    <Col>{pd_name}</Col>
                  </Row>
                  <Row m p>
                    <Col>Report Delivery Method:</Col>
                    <Col>{report_type}</Col>
                  </Row>
                </Col>
                <Col>
                  <Row m p>
                    <Col>City:</Col>
                    <Col>{city}</Col>
                  </Row>
                  <Row m p>
                    <Col>Zip:</Col>
                    <Col>{zip}</Col>
                  </Row>
                  <Row m p>
                    <Col>Phone:</Col>
                    <Col>{phone}</Col>
                  </Row>
                  <Row m p>
                    <Col>Phone:</Col>
                    <Col>{maint_contact_phone1}</Col>
                  </Row>
                  <Row m p>
                    <Col>Phone:</Col>
                    <Col>{park_contact_phone}</Col>
                  </Row>
                  <Row m p>
                    <Col>Phone:</Col>
                    <Col>{pd_phone}</Col>
                  </Row>
                </Col>
              </Row>
            )
          )}
        </RoundedSection>
      </Container>
    );
  }
}
