// @flow
import type { Dispatch } from '../reducers/types';
import model from '../service/model';
import api from '../service/api';
import utility from '../utils/utility';

const fs = require('fs');

export const ADD_TAB = 'ADD_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';
export const GET_TAB_PROPERTIES = 'GET_TAB_PROPERTIES';
export const SET_TAB_PROPERTIES = 'SET_TAB_PROPERTIES';
export const OPEN_LOG = 'OPEN_LOG';
export const SAVE_RECORD = 'SAVE_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';
export const GET_PASSDOWN_LOGS = 'GET_PASSDOWN_LOGS';
export const ADDING = 'ADDING';
export const REQUEST_SUPERVISOR = 'REQUEST_SUPERVISOR';
export const GET_TOW_STATUS = 'GET_TOW_STATUS';
export const SET_TOW_STATUS = 'SET_TOW_STATUS';
export const GET_POST_ORDERS = 'GET_POST_ORDERS';
export const SET_PROFILES = 'SET_PROFILES';
export const GET_PROFILE_INFOS = 'GET_PROFILE_INFOS';
export const SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE';
export const SET_PROFILE_INFO = 'SET_PROFILE_INFO';
export const SET_PROFILE_INFOS_LOADING = 'SET_PROFILE_INFOS_LOADING';
export const SET_PROFILE_INFO_LOADING = 'SET_PROFILE_INFO_LOADING';
export const SET_PROFILE_IMAGE_LOADING = 'SET_PROFILE_IMAGE_LOADING';
export const SET_POST_ORDERS_LOADING = 'SET_POST_ORDERS_LOADING';
export const SET_POST_ORDER_DETAILS_LOADING = 'SET_POST_ORDER_DETAILS_LOADING';
export const SET_POST_ORDER_DETAILS = 'SET_POST_ORDER_DETAILS';

const { remote } = require('electron');

const { app } = remote;
const { DB_PATH, DB_NAME } = process.env;
const dbPath = `${app.getPath('home')}/${DB_PATH}/${DB_NAME}`;

export function addTab(tabType: string, tabId: number) {
  return {
    type: ADD_TAB,
    tabType,
    tabId
  };
}

export function removeTab(tabId: number) {
  return {
    type: REMOVE_TAB,
    tabId
  };
}

export function getTabProperties(tabType: string, tabId: number) {
  return {
    type: GET_TAB_PROPERTIES,
    tabType,
    tabId
  };
}

export function setTabProperties(
  tabType: string,
  tabId: number,
  props: Object
) {
  return {
    type: SET_TAB_PROPERTIES,
    tabType,
    tabId,
    props
  };
}

export function openLog() {
  return {
    type: OPEN_LOG
  };
}

export function saveRecord(recordType: string, props: Object) {
  const { id, attachments, userId, account, individuals, vehicles } = props;

  if (id) {
    model.deleteRecord(dbPath, id);
    model.deleteAttachments(dbPath, id);
    model.deleteIndividual(dbPath, id);
    model.deleteVehicle(dbPath, id);
  }
  const recordId = utility.getRandomInt();
  model.addRecord(
    dbPath,
    id || recordId,
    userId,
    account,
    recordType,
    JSON.stringify(props)
  );
  if (individuals) {
    individuals.forEach(individual => {
      const data = JSON.stringify({
        ...individual
      });
      model.addIndividual(dbPath, id || recordId, data);
    });
  }
  if (attachments) {
    attachments.forEach(attachment => {
      model.addAttachment(dbPath, id || recordId, attachment);
    });
  }
  if (vehicles) {
    vehicles.forEach(vehicle => {
      const data = JSON.stringify({
        ...vehicle
      });
      model.addVehicle(dbPath, id || recordId, data);
    });
  }

  return {
    type: SAVE_RECORD,
    savedRecordId: id || recordId
  };
}

export function deleteRecord(recordId: number) {
  model.getAttachments(dbPath, recordId, rows => {
    for (const key in rows) {
      fs.unlink(rows[key].filename, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
  model.deleteRecord(dbPath, recordId);
  model.deleteAttachments(dbPath, recordId);
  model.deleteIndividual(dbPath, recordId);
  model.deleteVehicle(dbPath, recordId);
  return {
    type: DELETE_RECORD
  };
}

export function setPassdownLogs(passdownLogs: Array<any>) {
  return {
    type: GET_PASSDOWN_LOGS,
    passdownLogs
  };
}

export function setAdding(adding: boolean) {
  return {
    type: ADDING,
    adding
  };
}

export function setRequestSupervisorStatus(success: boolean) {
  return {
    type: REQUEST_SUPERVISOR,
    success
  };
}

export function getPassdownLogs(
  districtId: string,
  accountId: string,
  status: string,
  daysAgo: number
) {
  return (dispatch: Dispatch) => {
    api
      .getPassdownLogs(districtId, accountId, status, daysAgo)
      .then(res => res.json())
      .then(response => dispatch(setPassdownLogs(response)))
      .catch(() => dispatch(setPassdownLogs([])));
  };
}

export function savePassdownLog(
  excerpt: string,
  districtId: string,
  accountId: string,
  status: string,
  priority: string,
  recordId: string
) {
  return (dispatch: Dispatch) => {
    api
      .savePassdownLog(
        excerpt,
        districtId,
        accountId,
        status,
        priority,
        recordId
      )
      .then(res => res.json())
      .then(() => dispatch(setAdding(false)))
      .catch(() => dispatch(setAdding(false)));
  };
}

export function setTowStatus(towStatus: Object) {
  return {
    type: SET_TOW_STATUS,
    towStatus
  };
}

export function getTowStatus(plate: string, accountId: number) {
  return (dispatch: Dispatch) => {
    api
      .getTowStatus(plate, accountId)
      .then(res => res.json())
      .then(data => dispatch(setTowStatus(data)))
      .catch(() => dispatch(setTowStatus(null)));
  };
}

export function requestSuperVisor(callbackNumber: string) {
  return (dispatch: Dispatch) => {
    api
      .requestSuperVisor(callbackNumber)
      .then(res => res.json())
      .then(() => dispatch(setRequestSupervisorStatus(true)))
      .catch(() => dispatch(setRequestSupervisorStatus(false)));
  };
}

export function setPostOrders(postOrders: Object) {
  return {
    type: GET_POST_ORDERS,
    postOrders
  };
}

export function setPostOrdersLoading(postOrdersLoading: boolean) {
  return {
    type: SET_POST_ORDERS_LOADING,
    postOrdersLoading
  };
}

export function getPostOrders(
  district: string,
  accountId: string,
  address: string,
  city: string
) {
  return (dispatch: Dispatch) => {
    dispatch(setPostOrdersLoading(true));
    api
      .getPostOrders(district, accountId, address, city)
      .then(res => res.json())
      .then(data => {
        dispatch(setPostOrdersLoading(false));
        return dispatch(setPostOrders(data));
      })
      .catch(() => {
        dispatch(setPostOrdersLoading(false));
        return dispatch(setPostOrders(null));
      });
  };
}

export function setProfiles(profiles: Object) {
  return {
    type: SET_PROFILES,
    profiles
  };
}

export function setProfileInfo(profile: Object) {
  return {
    type: SET_PROFILE_INFO,
    profile
  };
}

export function setProfileImage(profileImage: string) {
  return {
    type: SET_PROFILE_IMAGE,
    profileImage
  };
}

export function setProfileInfosLoading(profileInfosLoading: boolean) {
  return {
    type: SET_PROFILE_INFOS_LOADING,
    profileInfosLoading
  };
}

export function setProfileInfoLoading(profileInfoLoading: boolean) {
  return {
    type: SET_PROFILE_INFO_LOADING,
    profileInfoLoading
  };
}

export function setProfileImageLoading(profileImageLoading: boolean) {
  return {
    type: SET_PROFILE_IMAGE_LOADING,
    profileImageLoading
  };
}

export function searchProfiles(
  firstName: string,
  lastName: string,
  dlNumber: string,
  propertyCardId: string
) {
  return (dispatch: Dispatch) => {
    dispatch(setProfileInfosLoading(true));
    dispatch(setProfiles(null));

    api
      .searchProfiles(firstName, lastName, dlNumber, propertyCardId)
      .then(res => res.json())
      .then(data => {
        dispatch(setProfileInfosLoading(false));
        return dispatch(setProfiles(data));
      })
      .catch(() => {
        dispatch(setProfileInfosLoading(false));
        return dispatch(setProfiles(null));
      });
  };
}

export function getProfileInfos(profileId: string) {
  return (dispatch: Dispatch) => {
    dispatch(setProfileInfoLoading(true));
    dispatch(setProfileInfo(null));
    dispatch(getProfileImage(profileId));

    api
      .getProfileInfos(profileId)
      .then(res => res.json())
      .then(data => {
        dispatch(setProfileInfoLoading(false));
        return dispatch(setProfileInfo(data));
      })
      .catch(() => {
        dispatch(setProfileInfoLoading(false));
        return dispatch(setProfileInfo(null));
      });
  };
}

export function getProfileImage(profileId: string) {
  return (dispatch: Dispatch) => {
    dispatch(setProfileImageLoading(true));
    dispatch(setProfileImage(null));

    api
      .getProfileImage(profileId)
      .then(res => {
        const reader = res.body.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                return pump();
              });
            }
          }
        });
      })
      .then(stream => new Response(stream))
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(url => {
        dispatch(setProfileImageLoading(false));
        return dispatch(setProfileImage(url));
      })
      .catch(err => {
        dispatch(setProfileImageLoading(false));
        console.error(err);
      });
  };
}

export const setPostOrderDetailsLoading = (
  postOrderDetailsLoading: boolean
) => ({
  type: SET_POST_ORDER_DETAILS_LOADING,
  postOrderDetailsLoading
});

export const setPostOrderDetails = (postOrderDetails: Object) => ({
  type: SET_POST_ORDER_DETAILS,
  postOrderDetails
});

export function getPostOrderDetails(accountId: string) {
  return (dispatch: Dispatch) => {
    dispatch(setPostOrderDetailsLoading(true));
    api
      .getPostOrderDetails(accountId)
      .then(res => res.json())
      .then(data => {
        dispatch(setPostOrderDetailsLoading(false));
        return dispatch(setPostOrderDetails(data));
      })
      .catch(() => {
        dispatch(setPostOrderDetailsLoading(false));
        return dispatch(setPostOrderDetails(null));
      });
  };
}
