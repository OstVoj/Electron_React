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
import styles from './Right.css';

type Props = {
  timeClockStore: Object,
  addTab: (tabType: string, tabId: number) => void,
  getTabProperties: (tabType: string, tabId: number) => void
};

type States = {
  tabData: PropTypes.object,
  activeIndex: number,
  timeClockTabId: number,
  arrestReportTabId: number
};

class Right extends Component<Props, States> {
  props: Props;

  state = {
    tabData: [
      {
        tab: 'Home',
        closable: false,
        id: 0,
        component: <Home onNewTab={title => this.addItem(title)} />
      }
    ],
    activeIndex: 0,
    timeClockTabId: 0,
    arrestReportTabId: 0,
  };

  componentDidUpdate(prevProps: PropTypes.object) {
    const { timeClockStore } = this.props;
    const prevTimeClockUploaded = prevProps.timeClockStore.timeClockUploaded;
    const { timeClockUploaded } = timeClockStore;
    if (!prevTimeClockUploaded && timeClockUploaded) {
      const { timeClockTabId, tabData } = this.state;
      this.setState({
        tabData: tabData.filter(item => item.id !== timeClockTabId),
        activeIndex: 0
      });
      this.setState({
        timeClockTabId: 0
      });
    }
  }

  addItem = (title: string) => {
    const id = new Date().valueOf();
    const { tabData } = this.state;
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
      const { addTab, getTabProperties } = this.props;
      addTab('ARREST REPORT', id);
      getTabProperties('ARREST REPORT', id);
      component = <ArrestReport onCloseTab={() => this.onCloseTab(id)} />;
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

  onCloseTab = (id: string) => {
    const { tabData, timeClockTabId } = this.state;
    this.setState({
      tabData: tabData.filter(item => item.id !== id),
      activeIndex: 0
    });
    if (id === timeClockTabId) {
      this.setState({
        timeClockTabId: 0
      });
    }
  };

  onTabClick = (id: string) => {
    const { tabData } = this.state;
    const { getTabProperties } = this.props;
    const tab = tabData.filter(item => item.id === id);
    if (id !== 0) {
      getTabProperties(tab[0].tab, id);
    }
    const index = tabData.findIndex(item => item.id === id);
    this.setState({
      activeIndex: index
    });
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
