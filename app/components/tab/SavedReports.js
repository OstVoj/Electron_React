/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';
import Alert from '../dialog/Alert';
import Confirm from '../dialog/Confirm';
import * as TabActions from '../../actions/tab';
import styles from './SavedReports.css';
import model from '../../service/model';

const { remote } = require('electron');

const { app } = remote;
const { DB_PATH, DB_NAME } = process.env;
const dbPath = `${app.getPath('home')}/${DB_PATH}/${DB_NAME}`;

type Props = {
  openReportTab: (type: string, id: number) => void,
  deleteRecord: (id: number) => void,
  loginStore: Object
};

type States = {
  reportRows: Array<any>,
  selectedRows: Array<any>,
  isAlertVisible: boolean,
  isConfirmVisible: boolean,
  message: string
};

class SavedReports extends Component<Props, States> {
  props: Props;

  state = {
    reportRows: [],
    selectedRows: [],
    isAlertVisible: false,
    isConfirmVisible: false,
    message: ''
  };

  componentDidMount() {
    this.getReports([]);
  }

  componentDidUpdate(prevProps) {
    const { loginStore } = this.props;
    if (loginStore.loader !== prevProps.loginStore.loader) {
      this.getReports([]);
    }
  }

  deleteSelectedReports = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      this.setState({
        isAlertVisible: true,
        message: 'A report must be selected first.'
      });
      return;
    }
    this.setState({
      isConfirmVisible: true,
      message: 'Are you sure?'
    });
  };

  onConfirmDelete = () => {
    const { selectedRows } = this.state;
    const { deleteRecord } = this.props;
    selectedRows.forEach(row => {
      deleteRecord(row.id);
    });
    this.getReports([]);
    this.setState({
      selectedRows: [],
      isConfirmVisible: false
    });
  };

  editSelectedReports = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      this.setState({
        isAlertVisible: true,
        message: 'A report must be selected first.'
      });
      return;
    }
    const { openReportTab } = this.props;
    selectedRows.forEach(row => {
      openReportTab(row.type, row.id);
    });
  };

  getAccountName = (accountId: number) => {
    const { loginStore } = this.props;
    if (loginStore.loader) {
      const { accounts } = loginStore.loader;
      const filters = accounts.filter(
        account => account.accountId === accountId
      );
      if (filters.length > 0) {
        return filters[0].name;
      }
      return null;
    }
    return null;
  };

  getReports = (selectedRows: Array<any>) => {
    const reportTables = ['records'];
    const result = [];
    reportTables.map(async (table: string) => {
      if (table === 'records') {
        const records = await model.getRecords(dbPath);
        for (const key in records) {
          const jsonData = JSON.parse(records[key].jsonData);
          const note = jsonData.notes;
          const filtered = selectedRows.filter(
            item => item.id === records[key].id
          );
          result.push(
            <tr
              className={filtered.length > 0 ? styles.activeRow : ''}
              onClick={() =>
                this.setSelectedRows(records[key].id, records[key].recordType)
              }
              key={`${records[key].id}-${records[key].recordType}`}
            >
              <td>
                {records[key].recordType === 'shift'
                  ? 'N / A'
                  : this.getAccountName(jsonData.account)}
              </td>
              <td className="white-space-pre">
                {records[key].recordType === 'shift'
                  ? 'N / A'
                  : note &&
                    note.substring(0, 100).replace(/(\r\n|\n|\r)/gm, ' ')}
              </td>
              <td>{records[key].recordType}</td>
              <td>{records[key].id}</td>
            </tr>
          );
        }
        this.setState({
          reportRows: result
        });
        return 1;
      }
    });
  };

  setSelectedRows = (id: number, type: string) => {
    const { selectedRows } = this.state;
    let filtered = selectedRows.filter(
      item => item.id === id && item.type === type
    );
    if (filtered.length > 0) {
      filtered = selectedRows.filter(
        item => !(item.id === id && item.type === type)
      );
      this.getReports(filtered);
      this.setState({
        selectedRows: filtered
      });
    } else {
      const selected = cloneDeep(selectedRows);
      selected.push({
        id,
        type
      });
      this.getReports(selected);
      this.setState({
        selectedRows: selected
      });
    }
  };

  uploadSelectedReports = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      this.setState({
        isAlertVisible: true,
        message: 'A report must be selected first.'
      });
    }
  };

  printSelectedReports = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      this.setState({
        isAlertVisible: true,
        message: 'A report must be selected first.'
      });
    }
  };

  uploadAllReports = () => {};

  render() {
    const {
      reportRows,
      isAlertVisible,
      isConfirmVisible,
      message
    } = this.state;

    return (
      <div className={styles.container} data-tid="container">
        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Excerpt</th>
              <th>Report Type</th>
              <th>Record ID</th>
            </tr>
          </thead>
          <tbody>{reportRows}</tbody>
        </table>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className="tab-container-button"
            onClick={this.editSelectedReports}
          >
            Edit Selected Report
          </button>
          <button
            type="button"
            className="tab-container-button"
            onClick={this.deleteSelectedReports}
          >
            Delete Selected Reports
          </button>
          <button
            type="button"
            className="tab-container-button"
            onClick={this.uploadSelectedReports}
          >
            Upload Selected Reports
          </button>
          <button
            type="button"
            className="tab-container-button"
            onClick={this.printSelectedReports}
          >
            Upload/Print Selected
          </button>
          <button
            type="button"
            className="tab-container-button"
            onClick={this.uploadAllReports}
          >
            Upload All Reports
          </button>
        </div>
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
          onOK={this.onConfirmDelete}
          onCancel={() =>
            this.setState({
              isConfirmVisible: false
            })
          }
          show={isConfirmVisible}
          message={message}
        />
      </div>
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login,
    ...this.props
  };
}

function mapDispatchToProps(dispatch: PropTypes.object) {
  return bindActionCreators(TabActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedReports);
