// @flow
import PropTypes from 'prop-types';
import get from 'lodash.get';
import {
  ADD_TAB,
  REMOVE_TAB,
  GET_TAB_PROPERTIES,
  SET_TAB_PROPERTIES,
  OPEN_LOG,
  SAVE_RECORD,
  GET_PASSDOWN_LOGS,
  ADDING,
  REQUEST_SUPERVISOR,
  SET_TOW_STATUS,
  GET_POST_ORDERS,
  SET_PROFILES,
  SET_PROFILE_INFO,
  SET_PROFILE_IMAGE,
  SET_PROFILE_INFOS_LOADING,
  SET_PROFILE_INFO_LOADING,
  SET_PROFILE_IMAGE_LOADING,
  SET_POST_ORDERS_LOADING,
  SET_POST_ORDER_DETAILS,
  SET_POST_ORDER_DETAILS_LOADING
} from '../actions/tab';
import type { Action } from './types';

export default function tab(
  state: PropTypes.object = {
    tabs: [],
    selectedTabProps: {},
    openLog: false
  },
  action: Action
) {
  let tabs;
  let tabType;
  let tabId;
  let props;
  let tab;
  const tabPropsSelected = state.selectedTabProps;
  const selectedTabId = get(tabPropsSelected, 'tabId');
  let postOrders = get(state, 'postOrders');
  let profiles = get(state, 'profiles');
  let profile = get(state, 'profile');
  let profileImages = get(state, 'profileImages');

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
          notes: '',
          attachments: []
        };
      } else if (action.tabType === 'INCIDENT REPORT') {
        tabProps = {
          selectedAccount: {},
          selectedClassification: {},
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
          notes: '',
          attachments: [],
          vehicles: []
        };
      } else if (action.tabType === 'PATROL / DAR') {
        tabProps = {
          message: '',
          attachments: [],
          notes: '',
          arrivalTimes: [
            { value: '', edited: false },
            { value: '', edited: false },
            { value: '', edited: false },
            { value: '', edited: false },
            { value: '', edited: false },
            { value: '', edited: false },
            { value: '', edited: false },
            { value: '', edited: false },
            { value: '', edited: false },
            { value: '', edited: false },
            { value: '', edited: false }
          ],
          contacts: [],
          observations: [],
          shiftStart: '',
          shiftEnd: ''
        };
      } else if (action.tabType === 'FI-FIELD INTERVIEW') {
        tabProps = {
          selectedAccount: {},
          description: {
            height: '',
            weight: '',
            hair: '',
            eyes: '',
            race: '',
            age: ''
          },
          misc: {
            tattoos: '',
            scars: '',
            piercings: '',
            clothing: '',
            probationOfficer: '',
            reasonForFI: ''
          },
          employment: {
            occupation: ''
          },
          notes: '',
          attachments: [],
          criminalOrganizationInformation: {
            gangAffiliation: '',
            alias: ''
          },
          account: '',
          individualInformation: [],
          individuals: []
        };
      } else if (action.tabType === 'ACTIVITY REPORT') {
        tabProps = {
          selectedAccount: {},
          dateReported: '',
          shiftStart: '',
          shiftEnd: '',
          observations: [],
          contacts: [],
          duties: [],
          attachments: [],
          time: '',
          date: '',
          activityNotes: '',
          selectedActivity: {}
        };
      } else if (action.tabType === 'MAINTENANCE REPORT') {
        tabProps = {
          selectedAccount: {},
          attachments: [],
          maintenenceIssues: [],
          urgency: 0,
          chkMaintenance: false,
          chkPropertyManager: false,
          chkGasCompany: false,
          chkElectricCompany: false,
          notes: ''
        };
      } else if (action.tabType === 'VEHICLE INSPECTION') {
        tabProps = {
          selectedAccount: {},
          attachments: [],
          inspectionItems: [],
          vehicleDriveAbility: '',
          priorDriver: '',
          urgentMaintenance: '',
          shiftStartMileAge: '',
          shiftEndMileAge: '',
          vehicle: '',
          notes: ''
        };
      } else if (action.tabType === 'WARNING NOTICE') {
        tabProps = {
          selectedAccount: {},
          attachments: [],
          individuals: [],
          codeOfViolations: [],
          internal: '',
          other: '',
          isViolatorPropertyResident: false,
          validatorIsAGuestOf: '',
          requestedThatViolatorNotReturnToProperty: false,
          finePayee: '',
          fineAmount: '',
          notes: ''
        };
      } else if (action.tabType === 'VFI-VEHICLE FIELD INFO') {
        tabProps = {
          selectedAccount: {},
          individuals: [],
          selectedIndividualId: 0,
          disposition: '',
          reasonForVfi: '',
          notes: '',
          attachments: [],
          vehicles: []
        };
      } else if (action.tabType === 'PROPERTY INFORMATION') {
        tabProps = {
          selectedAccount: {},
          individuals: [],
          selectedIndividualId: 0,
          notes: '',
          locationOfIncident: '',
          attachments: [],
          stolen: false,
          recovered: false,
          lost: false,
          found: false,
          evidence: false,
          dateStolen: '',
          articleType: '',
          dateRecovered: '',
          articleColor: '',
          dateLost: '',
          estValue: '',
          dateFound: '',
          serial: '',
          agency: '',
          storedAt: ''
        };
      } else if (action.tabType === 'SHIFT REPORT') {
        tabProps = {
          selectedAccount: {},
          selectedActivity: {},
          timeIn: '',
          timeOut: '',
          reports: [],
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
        ...state,
        tabs
      };
    case REMOVE_TAB:
      tabId = action.tabId;
      tabs = state.tabs;
      const keys = Object.keys(tabs);
      const filteredTabs = [];
      keys.map(key => {
        filteredTabs[key] = tabs[key].filter(item => item.tabId !== tabId);
        return 1;
      });
      return {
        ...state,
        tabs: filteredTabs,
        selectedTabProps: {}
      };
    case GET_TAB_PROPERTIES:
      tabType = action.tabType;
      tabId = action.tabId;
      tabs = state.tabs;
      tabs = tabs[tabType];
      props = tabs ? tabs.filter(tab => tab.tabId === tabId) : [{}];
      return {
        ...state,
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
        ...state
      };
    case OPEN_LOG:
      return {
        ...state,
        openLog: true
      };
    case SAVE_RECORD:
      const { savedRecordId } = action;
      const { selectedTabProps } = state;
      selectedTabProps.props.id = savedRecordId;

      return {
        ...state,
        selectedTabProps
      };
    case GET_PASSDOWN_LOGS:
      return {
        ...state,
        passdownLogs: action.passdownLogs
      };
    case ADDING:
      return {
        ...state,
        adding: action.adding
      };
    case REQUEST_SUPERVISOR:
      return {
        ...state,
        requestSupervisorStatus: action.success
      };
    case SET_TOW_STATUS:
      return {
        ...state,
        towStatus: action.towStatus
      };
    case GET_POST_ORDERS:
      if (!postOrders) {
        postOrders = {};
      }
      postOrders[selectedTabId] = action.postOrders;

      return {
        ...state,
        postOrders
      };
    case SET_PROFILES:
      if (!profiles) {
        profiles = {};
      }
      profiles[selectedTabId] = action.profiles;

      return {
        ...state,
        profiles
      };
    case SET_PROFILE_INFO:
      if (!profile) {
        profile = {};
      }
      profile[selectedTabId] = action.profile;

      return {
        ...state,
        profile
      };
    case SET_PROFILE_IMAGE:
      if (!profileImages) {
        profileImages = {};
      }
      profileImages[selectedTabId] = action.profileImage;

      return {
        ...state,
        profileImages
      };
    case SET_PROFILE_INFOS_LOADING:
      return {
        ...state,
        profileInfosLoading: action.profileInfosLoading
      };
    case SET_PROFILE_INFO_LOADING:
      return {
        ...state,
        profileInfoLoading: action.profileInfoLoading
      };
    case SET_PROFILE_IMAGE_LOADING:
      return {
        ...state,
        profileImageLoading: action.profileImageLoading
      };
    case SET_POST_ORDERS_LOADING:
      return {
        ...state,
        postOrdersLoading: action.postOrdersLoading
      };
    case SET_POST_ORDER_DETAILS_LOADING:
      return {
        ...state,
        postOrderDetailsLoading: action.postOrderDetailsLoading
      };
    case SET_POST_ORDER_DETAILS:
      return {
        ...state,
        postOrderDetails: action.postOrderDetails
      };
    default:
      return state;
  }
}
