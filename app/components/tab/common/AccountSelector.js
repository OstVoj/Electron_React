// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

type Props = {
  loginStore: PropTypes.Object,
  disabled?: boolean,
  onSelectAccount: (account: PropTypes.Object) => void,
  selectedAccount: ?PropTypes.Object
};

class AccountSelector extends Component<Props> {
  props: Props;

  static defaultProps = {
    disabled: false
  };

  render() {
    const {
      onSelectAccount,
      selectedAccount,
      loginStore,
      disabled
    } = this.props;
    let selectValues = [];
    if (loginStore.loader) {
      const { accounts } = loginStore.loader;
      selectValues = accounts.map(account => {
        const ret = account;
        ret.value = account.accountId;
        ret.label = account.name;
        return ret;
      });
      selectValues.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }

    return (
      <Select
        options={selectValues}
        value={selectedAccount}
        onChange={account => onSelectAccount(account)}
        isDisabled={disabled}
      />
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login
  };
}

export default connect(mapStateToProps)(AccountSelector);
