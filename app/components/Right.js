// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CloseableTabs from 'react-closeable-tabs';
import * as TabActions from '../actions/tab';
import Home from './tab/Home';
import NewTab from './tab/NewTab';
import TimeClock from './tab/TimeClock';
import ArrestReport from './tab/ArrestReport';
import SavedReports from './tab/SavedReports';
import PatrolReport from './tab/PatrolReport';
import FieldInterview from './tab/FieldInterview';
import GpsPositionStatistics from './tab/GpsPositionStatistics';
import IncidentReport from './tab/IncidentReport';
import ActivityReport from './tab/ActivityReport';
import MaintenanceReport from './tab/MaintenanceReport';
import VehicleInspection from './tab/VehicleInspection';
import Log from './tab/Log';
import model from '../service/model';
import styles from './Right.css';
import WarningNotice from './tab/WarningNotice';
import VehicleFieldInfo from './tab/VehicleFieldInfo';
import PropertyInformation from './tab/PropertyInformation';
import ShiftReport from './tab/ShiftReport';
import PassdownLog from './tab/PassdownLog';
import RequestSupervisor from './tab/RequestSupervisor';
import Chat from './tab/Chat';
import ParkingViolation from './tab/ParkingViolation';
import PostOrders from './tab/PostOrders';
import SubjectIdVerification from './tab/SubjectIDVerification';

const { remote } = require('electron');

const { app } = remote;
const { DB_PATH, DB_NAME } = process.env;
const dbPath = `${app.getPath('home')}/${DB_PATH}/${DB_NAME}`;

type Props = {
  timeClockStore: Object,
  loginStore: Object,
  tabStore: Object,
  addTab: (tabType: string, tabId: any) => void,
  removeTab: (tabId: number) => void,
  getTabProperties: (tabType: string, tabId: number) => void,
  setTabProperties: (type: string, tabId: number, props: Object) => void
};

type States = {
  tabData: PropTypes.object,
  activeIndex: number,
  timeClockTabId: number,
  savedReportsTabId: number,
  requestSupervisorTabId: number,
  logTabId: number,
  chatTabId: number
};

class Right extends Component<Props, States> {
  props: Props;

  state = {
    tabData: [
      {
        tab: 'HOME',
        closable: false,
        id: 0,
        component: <Home onNewTab={title => this.addItem(title)} />
      }
    ],
    activeIndex: 0,
    timeClockTabId: 0,
    savedReportsTabId: 0,
    requestSupervisorTabId: 0,
    logTabId: 0,
    chatTabId: 0
  };

  componentDidUpdate(prevProps: PropTypes.object) {
    const { timeClockStore, tabStore } = this.props;
    const prevTimeClockUploaded = prevProps.timeClockStore.timeClockUploaded;
    const { timeClockUploaded } = timeClockStore;
    if (!prevTimeClockUploaded && timeClockUploaded) {
      const { timeClockTabId, tabData } = this.state;
      this.setState({
        tabData: tabData.filter(item => item.id !== timeClockTabId),
        activeIndex: 0,
        timeClockTabId: 0
      });
    }

    const { openLog } = tabStore;
    if (!prevProps.tabStore.openLog && openLog) {
      this.addItem('APPLICATION LOG');
    }
  }

  addItem = (title: string) => {
    const id = Number(`${new Date().valueOf()}`);
    const { tabData } = this.state;
    const { addTab, getTabProperties } = this.props;

    let component = <NewTab title={title} />;
    if (title === 'TIME CLOCK') {
      const { timeClockTabId } = this.state;
      if (timeClockTabId === 0) {
        component = <TimeClock title={title} />;
        this.setState({
          timeClockTabId: id
        });
      } else {
        let timeClockTabIndex = 0;
        tabData.forEach((item, index) => {
          if (item.id === timeClockTabId) {
            timeClockTabIndex = index;
          }
        });
        this.setState({
          activeIndex: timeClockTabIndex
        });
        return;
      }
    } else if (title === 'ARREST REPORT') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <ArrestReport onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'INCIDENT REPORT') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <IncidentReport onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'SAVED REPORTS') {
      const { savedReportsTabId } = this.state;
      if (savedReportsTabId === 0) {
        this.setState({
          savedReportsTabId: id
        });
        addTab(title, id);
        getTabProperties(title, id);
        component = <SavedReports openReportTab={this.openReportTab} />;
      } else {
        let savedReportsTabIndex = 0;
        tabData.forEach((item, index) => {
          if (item.id === savedReportsTabId) {
            savedReportsTabIndex = index;
          }
        });
        this.setState({
          activeIndex: savedReportsTabIndex
        });
        return;
      }
    } else if (title === 'PATROL / DAR') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <PatrolReport onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'FI-FIELD INTERVIEW') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <FieldInterview onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'GPS POSITION STATISTICS') {
      addTab(title, id);
      getTabProperties(title, id);
      component = (
        <GpsPositionStatistics onCloseTab={() => this.onCloseTab(id)} />
      );
    } else if (title === 'ACTIVITY REPORT') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <ActivityReport onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'MAINTENANCE REPORT') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <MaintenanceReport onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'VEHICLE INSPECTION') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <VehicleInspection onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'WARNING NOTICE') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <WarningNotice onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'VFI-VEHICLE FIELD INFO') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <VehicleFieldInfo onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'PROPERTY INFORMATION') {
      addTab(title, id);
      getTabProperties(title, id);
      component = (
        <PropertyInformation onCloseTab={() => this.onCloseTab(id)} />
      );
    } else if (title === 'SHIFT REPORT') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <ShiftReport onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'PASSDOWN LOG') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <PassdownLog onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'APPLICATION LOG') {
      const { logTabId } = this.state;
      if (logTabId === 0) {
        this.setState({
          logTabId: id
        });
        component = <Log onCloseTab={() => this.onCloseTab(id)} />;
      } else {
        let logTabIndex = 0;
        tabData.forEach((item, index) => {
          if (item.id === logTabId) {
            logTabIndex = index;
          }
        });
        this.setState({
          activeIndex: logTabIndex
        });
        return;
      }
    } else if (title === 'REQUEST SUPERVISOR') {
      const { requestSupervisorTabId } = this.state;
      if (requestSupervisorTabId === 0) {
        addTab(title, id);
        getTabProperties(title, id);
        this.setState({
          requestSupervisorTabId: id
        });
        component = (
          <RequestSupervisor onCloseTab={() => this.onCloseTab(id)} />
        );
      } else {
        let requestSupervisorTabIndex = 0;
        tabData.forEach((item, index) => {
          if (item.id === requestSupervisorTabId) {
            requestSupervisorTabIndex = index;
          }
        });
        getTabProperties(title, requestSupervisorTabId);
        this.setState({
          activeIndex: requestSupervisorTabIndex
        });
        return;
      }
    } else if (title === 'CHAT') {
      const { chatTabId } = this.state;
      if (chatTabId === 0) {
        addTab(title, id);
        getTabProperties(title, id);
        this.setState({
          chatTabId: id
        });
        component = <Chat onCloseTab={() => this.onCloseTab(id)} />;
      } else {
        let chatTabIndex = 0;
        tabData.forEach((item, index) => {
          if (item.id === chatTabId) {
            chatTabIndex = index;
          }
        });
        getTabProperties(title, chatTabId);
        this.setState({
          activeIndex: chatTabIndex
        });
        return;
      }
    } else if (title === 'PARKING VIOLATION') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <ParkingViolation onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'POST ORDERS') {
      addTab(title, id);
      getTabProperties(title, id);
      component = <PostOrders onCloseTab={() => this.onCloseTab(id)} />;
    } else if (title === 'SUBJECT I.D. VERIFICATION') {
      addTab(title, id);
      getTabProperties(title, id);
      component = (
        <SubjectIdVerification onCloseTab={() => this.onCloseTab(id)} />
      );
    }

    tabData.splice(tabData.length, 0, {
      tab: title,
      component,
      id,
      closeable: true
    });

    this.setState({
      tabData,
      activeIndex: tabData.length - 1
    });
  };

  onCloseTab = (id: any) => {
    const { removeTab } = this.props;
    const {
      tabData,
      timeClockTabId,
      savedReportsTabId,
      logTabId,
      requestSupervisorTabId,
      chatTabId
    } = this.state;
    this.setState({
      tabData: tabData.filter(item => item.id !== id),
      activeIndex: 0
    });
    if (id === timeClockTabId) {
      this.setState({
        timeClockTabId: 0
      });
    } else if (id === savedReportsTabId) {
      this.setState({
        savedReportsTabId: 0
      });
    } else if (id === logTabId) {
      this.setState({
        logTabId: 0
      });
    } else if (id === requestSupervisorTabId) {
      this.setState({
        requestSupervisorTabId: 0
      });
    } else if (id === chatTabId) {
      this.setState({
        chatTabId: 0
      });
    }
    removeTab(id);
  };

  onTabClick = (id: number) => {
    const { tabData } = this.state;
    const { getTabProperties } = this.props;
    const tab = tabData.filter(item => item.id === id);
    getTabProperties(tab[0].tab, id);
    const index = tabData.findIndex(item => item.id === id);
    this.setState({
      activeIndex: index
    });
  };

  setTabProperties = async (type: string, id: number, tabId: any) => {
    const { setTabProperties, getTabProperties } = this.props;

    const props = await new Promise(resolve => {
      model.getRecordById(dbPath, id, row => {
        const record = row[0];
        const jsonData = JSON.parse(record.jsonData);
        jsonData.id = record.id;
        resolve(jsonData);
      });
    });

    props.attachments = [];
    // get Attachments
    const attachments = await new Promise(resolve => {
      model.getAttachments(dbPath, id, rows => {
        resolve(rows);
      });
    });

    if (attachments) {
      Object.keys(attachments).map(key => {
        props.attachments.push(attachments[key].filename);
      });
    }

    // get Selected Account
    const accountId = props.account;
    const { loginStore } = this.props;
    const { accounts } = loginStore.loader;
    const selectedAccounts = accounts.filter(
      account => account.accountId === accountId
    );
    if (selectedAccounts.length > 0) {
      props.selectedAccount = selectedAccounts[0];
    }

    if (type === 'ARREST REPORT') {
      props.individuals = [];
      // get Individuals
      model.getIndividual(dbPath, id, rows => {
        Object.keys(rows).map(key => {
          props.individuals.push(JSON.parse(rows[key].jsonData));
        });
        setTabProperties(type, tabId, props);
        getTabProperties(type, tabId);
      });
    } else if (type === 'INCIDENT REPORT') {
      // get Selected Classification
      const { classification } = props;
      const { classifications } = loginStore.loader;

      const selectedClassifications = classifications.filter(
        item => item.id === classification
      );
      if (selectedClassifications.length > 0) {
        props.selectedClassification = selectedClassifications[0];
      }

      props.individuals = [];
      props.vehicles = [];
      // get Individuals
      model.getIndividual(dbPath, id, rows => {
        Object.keys(rows).map(key => {
          props.individuals.push(JSON.parse(rows[key].jsonData));
        });
        // get Vehicles
        model.getVehicle(dbPath, id, rows => {
          Object.keys(rows).map(key => {
            props.vehicles.push(JSON.parse(rows[key].jsonData));
          });
          setTabProperties('INCIDENT REPORT', tabId, props);
          getTabProperties('INCIDENT REPORT', tabId);
        });
      });
    } else if (type === 'WARNING NOTICE') {
      props.individuals = [];
      // get Individuals
      model.getIndividual(dbPath, id, rows => {
        Object.keys(rows).map(key => {
          props.individuals.push(JSON.parse(rows[key].jsonData));
        });
        setTabProperties(type, tabId, props);
        getTabProperties(type, tabId);
      });
    } else {
      setTabProperties(type, tabId, props);
      getTabProperties(type, tabId);
    }
  };

  openReportTab = (type: string, id: number) => {
    const tabId = `${new Date().valueOf()}${id}`;
    const { tabData } = this.state;
    const { addTab, tabStore } = this.props;
    const { tabs } = tabStore;
    let found = false;
    const keys = Object.keys(tabs);
    keys.map((key: string) => {
      if (!found) {
        found = tabs[key].find(item => item.props.id === id);
      }
      return 1;
    });

    if (found) {
      let title = '';
      if (type === 'arrest') {
        title = 'ARREST REPORT';
      } else if (type === 'patrol') {
        title = 'PATROL / DAR';
      } else if (type === 'patrol') {
        title = 'PATROL / DAR';
      } else if (type === 'field interview') {
        title = 'FI-FIELD INTERVIEW';
      } else if (type === 'activity') {
        title = 'ACTIVITY REPORT';
      } else if (type === 'maintenance') {
        title = 'MAINTENANCE REPORT';
      } else if (type === 'vehicle inspection') {
        title = 'VEHICLE INSPECTION';
      } else if (type === 'warning notice') {
        title = 'WARNING NOTICE';
      } else if (type === 'vehicle field info') {
        title = 'VFI-VEHICLE FIELD INFO';
      } else if (type === 'property information') {
        title = 'PROPERTY INFORMATION';
      } else if (type === 'shift') {
        title = 'SHIFT REPORT';
      } else if (type === 'parking violation') {
        title = 'PARKING VIOLATION';
      }
      this.setTabProperties(title, id, found.tabId);
      this.setState({
        activeIndex: tabData.findIndex(tab => tab.id === found.tabId)
      });
    } else {
      let component = null;
      let title = '';
      if (type === 'arrest') {
        title = 'ARREST REPORT';
        component = <ArrestReport onCloseTab={() => this.onCloseTab(tabId)} />;
      }
      if (type === 'incident') {
        title = 'INCIDENT REPORT';
        component = (
          <IncidentReport onCloseTab={() => this.onCloseTab(tabId)} />
        );
      } else if (type === 'patrol') {
        title = 'PATROL / DAR';
        component = <PatrolReport onCloseTab={() => this.onCloseTab(tabId)} />;
      } else if (type === 'field interview') {
        title = 'FI-FIELD INTERVIEW';
        component = (
          <FieldInterview onCloseTab={() => this.onCloseTab(tabId)} />
        );
      } else if (type === 'activity') {
        title = 'ACTIVITY REPORT';
        component = (
          <ActivityReport onCloseTab={() => this.onCloseTab(tabId)} />
        );
      } else if (type === 'maintenance') {
        title = 'MAINTENANCE REPORT';
        component = (
          <MaintenanceReport onCloseTab={() => this.onCloseTab(tabId)} />
        );
      } else if (type === 'vehicle inspection') {
        title = 'VEHICLE INSPECTION';
        component = (
          <VehicleInspection onCloseTab={() => this.onCloseTab(tabId)} />
        );
      } else if (type === 'vehicle field info') {
        title = 'VFI-VEHICLE FIELD INFO';
        component = (
          <VehicleFieldInfo onCloseTab={() => this.onCloseTab(tabId)} />
        );
      } else if (type === 'warning notice') {
        title = 'WARNING NOTICE';
        component = <WarningNotice onCloseTab={() => this.onCloseTab(tabId)} />;
      } else if (type === 'property information') {
        title = 'PROPERTY INFORMATION';
        component = (
          <PropertyInformation onCloseTab={() => this.onCloseTab(tabId)} />
        );
      } else if (type === 'shift') {
        title = 'SHIFT REPORT';
        component = <ShiftReport onCloseTab={() => this.onCloseTab(tabId)} />;
      } else if (type === 'parking violation') {
        component = (
          <ParkingViolation onCloseTab={() => this.onCloseTab(tabId)} />
        );
      }

      addTab(title, tabId);
      this.setTabProperties(title, id, tabId);

      tabData.splice(tabData.length, 0, {
        tab: title,
        component,
        id: tabId,
        closeable: true
      });
      this.setState({
        tabData,
        activeIndex: tabData.length - 1
      });
    }
  };

  render() {
    const { tabData, activeIndex } = this.state;

    return (
      <div className={styles.container} data-tid="container">
        <CloseableTabs
          tabPanelColor="#202124"
          data={tabData}
          onCloseTab={this.onCloseTab}
          activeIndex={activeIndex}
          tabPanelClass="tab-panel"
          onTabClick={this.onTabClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    timeClockStore: state.timeClock,
    loginStore: state.login,
    tabStore: state.tab,
    gpsStore: state.gps,
    ...this.props
  };
}

function mapDispatchToProps(dispatch: PropTypes.object) {
  return bindActionCreators(TabActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Right);
