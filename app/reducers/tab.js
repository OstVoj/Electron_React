// @flow
import PropTypes from 'prop-types';
import {
  ADD_TAB,
  GET_TAB_PROPERTIES,
  SET_TAB_PROPERTIES
} from '../actions/tab';
import type { Action } from './types';

export default function tab(
  state: PropTypes.object = {
    tabs: [],
    selectedTabProps: {}
  },
  action: Action
) {
  let tabs;
  let tabType;
  let tabId;
  let props;
  let tab;
  switch (action.type) {
    case ADD_TAB:
      tabs = state.tabs;

      let tabProps = {};
      if (action.tabType === 'ARREST REPORT') {
        tabProps = {
          selectedAccount: {},
          isModalVisible: false,
          individuals: [],
          selectedIndividualId: 0,
          warrant: '',
          court: '',
          agency: '',
          casenumber: '',
          gang: '',
          alias: '',
          chkFelony: false,
          chkMisdemeanor: false,
          chkCivil: false,
          chkOther: false,
          chkSecurity: false,
          chkCitizen: false,
          chkProperty: false,
          chkLaw: false,
          notes: ''
        };
      } else {
        tabProps = {};
      }

      tab = {
        tabId: action.tabId,
        props: tabProps
      };
      if (!tabs[action.tabType]) {
        tabs[action.tabType] = [];
      }
      tabs[action.tabType].push(tab);

      return {
        tabs
      };
    case GET_TAB_PROPERTIES:
      tabType = action.tabType;
      tabId = action.tabId;
      tabs = state.tabs;
      tabs = tabs[tabType];
      props = tabs ? tabs.filter(tab => tab.tabId === tabId) : [{}];
      return {
        tabs: state.tabs,
        selectedTabProps: props[0]
      };
    case SET_TAB_PROPERTIES:
      tabType = action.tabType;
      tabId = action.tabId;
      tabs = state.tabs[tabType];
      props = action.props;
      const result = tabs.filter(tab => {
        if (tab.tabId === tabId) {
          tab.props = action.props;
        }
        return tab;
      });
      state.tabs[tabType] = result;

      return {
        tabs: state.tabs,
        selectedTabProps: state.selectedTabProps
      };
    default:
      return state;
  }
}
