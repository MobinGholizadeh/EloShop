import { ADD_TAB, SET_ACT_KEY, REMOVE_TAB } from "./ActionTypes";

export function addTab(key) {
  return {
    type: ADD_TAB,
    key,
  };
}

export function setActiveKey(key) {
  return {
    type: SET_ACT_KEY,
    key,
  };
}

export function removeTab(key) {
  return {
    type: REMOVE_TAB,
    key,
  };
}
