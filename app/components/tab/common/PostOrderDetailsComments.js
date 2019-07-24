// @flow
import React, { Component } from 'react';
import { FadeLoader } from 'react-spinners';
import get from 'lodash.get';
import Container from '../../sections/Container';
import Fieldset from '../../sections/Fieldset';
import Row from '../../sections/Row';
import Col from '../../sections/Col';
import Input from '../../inputs/Input';

type Props = {
  postOrderDetails: Object,
  isLoading: boolean
};

export default class PostOrderDetailsComments extends Component<Props> {
  props: Props;

  render() {
    const { postOrderDetails, isLoading } = this.props;
    const postOrders = get(postOrderDetails, 'postOrders');
    const companyNotes = get(postOrderDetails, 'companyNotes');

    return (
      <Container>
        <Row>
          {isLoading ? (
            <Col justify="center">
              <FadeLoader
                sizeUnit="px"
                size={150}
                color="#ffffff"
                loading={isLoading}
              />
            </Col>
          ) : (
            <Col w={100}>
              <Row m p>
                <Col w={100}>
                  <Fieldset legend="Post Orders">
                    <Input type="textarea" readOnly value={postOrders} />
                  </Fieldset>
                </Col>
              </Row>
              <Row m p>
                <Col w={100}>
                  <Fieldset legend="Company Notes">
                    <Input type="textarea" readOnly value={companyNotes} />
                  </Fieldset>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}
