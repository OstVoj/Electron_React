// @flow
import React, { Component } from 'react';
import Select from 'react-select';
import keydown, { Keys } from 'react-keydown';
import Alert from '../../dialog/Alert';
import Confirm from '../../dialog/Confirm';
import Container from '../../sections/Container';
import Col from '../../sections/Col';
import Row from '../../sections/Row';
import Fieldset from '../../sections/Fieldset';
import HorizontalInput from '../../inputs/HorizontalInput';
import AccountSelector from './AccountSelector';
import PassdownPrioritySelector from './PassdownPrioritySelector';
import PassdownStatusSelector from './PassdownStatusSelector';
import Input from '../../inputs/Input';

type Props = {
  onClose: (data: ?Object) => void,
  passdown: ?Object,
  loginStore: Object
};

type States = {
  selectedAccount: ?Object,
  selectedStatus: ?Object,
  selectedPriority: ?Object,
  priority: string,
  status: string,
  excerpt: string,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  message: string
};

@keydown
export default class Passdown extends Component<Props, States> {
  props: Props;

  state = {
    selectedAccount: null,
    selectedPriority: null,
    selectedStatus: null,
    priority: '',
    status: '',
    excerpt: '',
    isAlertVisible: false,
    isConfirmVisible: false,
    message: ''
  };

  componentDidMount() {
    this.setPassdownInfos();
  }

  componentDidUpdate(prevProps: Object) {
    const { keydown } = prevProps;
    if (keydown.event) {
      const { event } = keydown;
      const { keyCode } = event;
      if (keyCode === 27) {
        this.onClose();
      }
    }
  }

  setPassdownInfos = () => {
    const { passdown } = this.props;
    if (passdown) {
      const { accountId, excerpt, priority, status } = passdown;

      this.setState({
        excerpt,
        selectedPriority: {
          label: priority,
          value: priority
        },
        selectedStatus: {
          label: status,
          value: status
        }
      });

      const { loginStore } = this.props;
      if (loginStore.loader) {
        const { accounts } = loginStore.loader;
        const filter = accounts.filter(
          account => account.accountId === accountId
        );
        if (filter.length > 0) {
          const selectedAccount = filter[0];
          this.setState({ selectedAccount });
        }
      }
    }
  };

  onClose = () => {
    this.setState({
      isConfirmVisible: true,
      message: 'Are you sure?'
    });
  };

  onConfirmClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  handleInputChange = (event: Object) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onSelectAccount = (account: Object) => {
    this.setState({
      selectedAccount: account
    });
  };

  onSelectStatus = (status: Object) => {
    this.setState({
      selectedStatus: status
    });
  };

  onSelectPriority = (priority: Object) => {
    this.setState({
      selectedPriority: priority
    });
  };

  onSave = () => {
    const { onClose, passdown } = this.props;
    const recordId = passdown ? passdown.recordId : '';
    const {
      selectedAccount,
      excerpt,
      selectedPriority,
      selectedStatus
    } = this.state;

    if (!selectedAccount) {
      this.setState({
        isAlertVisible: true,
        message: 'Account must be selected!'
      });
      return;
    }

    if (!selectedStatus) {
      this.setState({
        isAlertVisible: true,
        message: 'Status must be selected!'
      });
      return;
    }

    const jsonData = {
      recordId,
      accountId: selectedAccount.value,
      excerpt,
      priority: selectedPriority ? selectedPriority.value : '',
      status: selectedStatus.value
    };
    onClose(jsonData);
  };

  render() {
    const { onClose, passdown } = this.props;
    const {
      selectedAccount,
      selectedPriority,
      selectedStatus,
      excerpt,
      isAlertVisible,
      isConfirmVisible,
      message
    } = this.state;

    return (
      <Container column center>
        <Col>
          <Row>
            <Col align="center" w={30}>
              Account:
            </Col>
            <Col w={70}>
              <AccountSelector
                selectedAccount={selectedAccount}
                onSelectAccount={this.onSelectAccount}
                disabled={passdown ? true : false}
              />
            </Col>
          </Row>
        </Col>
        <br />
        <Col>
          <Fieldset legend="Passdown Information">
            <Row m p>
              <Input
                type="textarea"
                value={excerpt}
                name="excerpt"
                onChange={this.handleInputChange}
              />
            </Row>
          </Fieldset>
        </Col>
        <br />
        <Col>
          <Row>
            <Col>
              <Row>
                <Col align="center" w={30}>
                  Status:
                </Col>
                <Col w={70}>
                  <PassdownStatusSelector
                    selectedStatus={selectedStatus}
                    onSelectStatus={this.onSelectStatus}
                  />
                </Col>
              </Row>
            </Col>
            <Col m>
              <Row>
                <Col align="center" w={30}>
                  Priority:
                </Col>
                <Col w={70}>
                  <PassdownPrioritySelector
                    selectedPriority={selectedPriority}
                    onSelectPriority={this.onSelectPriority}
                  />
                </Col>
              </Row>
            </Col>
            <Col m align="center" justify="center">
              <button
                type="button"
                className="tab-container-button"
                onClick={this.onClose}
              >
                Cancel
              </button>
            </Col>
            <Col m align="center" justify="center">
              <button
                type="button"
                className="tab-container-button"
                onClick={this.onSave}
              >
                Save
              </button>
            </Col>
          </Row>
        </Col>
        <Alert
          onClose={() =>
            this.setState({
              isAlertVisible: false
            })
          }
          show={isAlertVisible}
          message={message}
        />
        <Confirm
          onOK={() => this.onConfirmClose()}
          onCancel={() =>
            this.setState({
              isConfirmVisible: false
            })
          }
          show={isConfirmVisible}
          message={message}
        />
      </Container>
    );
  }
}
