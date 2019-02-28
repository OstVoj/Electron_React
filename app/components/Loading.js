// @flow
import React, { Component } from 'react';
import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';
import styles from './Loading.css';

const override = css`
    display: block;
    margin: 0 auto;
`;

type Props = {
  loading: boolean
};

export default class Loading extends Component<Props> {
  props: Props;

  render() {
    const { loading } = this.props;
    return (
      loading && <div className={styles.container} data-tid="container">
        <FadeLoader
          sizeUnit={"px"}
          size={150}
          color={'#ffffff'}
          loading={loading}
        />
      </div>
    );
  }
}
