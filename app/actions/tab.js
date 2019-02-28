// @flow
import type { Dispatch } from '../reducers/types';

export const ADD_TAB = 'ADD_TAB';
export const GET_TAB_PROPERTIES = 'GET_TAB_PROPERTIES';
export const SET_TAB_PROPERTIES = 'SET_TAB_PROPERTIES';

export function addTab(tabType: string, tabId: number) {
  return {
    type: ADD_TAB,
    tabType,
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

export function setTabProperties(tabType: string, tabId: number, props: Object) {
  return {
    type: SET_TAB_PROPERTIES,
    tabType,
    tabId,
    props
  };
}
