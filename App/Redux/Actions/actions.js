'use strict';

// action types:

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const ADD_YAK = 'ADD_YAK';
export const SET_FEEDLOCATION_FILTER = 'SET_FEEDLOCATION_FILTER';
export const CONNECTION_CHECKING = 'CONNECTION_CHECKING';
export const CONNECTION_CHECKED = 'CONNECTION_CHECKED';
export const CONNECTION_ONLINE = 'CONNECTION_ONLINE';
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE';

// to be implemented as location filters for our yak feed
export const feedLocationFilters = {
  UNIV_USF: 'UNIV_USF',
  UNIV_SFSU: 'UNIV_SFSU',
  CITY_SF_ATT: 'CITY_SF_ATT',
  CITY_SF_FERRYBUILDING: 'CITY_SF_FERRYBUILDING',
  CITY_SONOMA_TEST: 'CITY_SONOMA_TEST'
};


// actionc creators
export function toggleModal(index) {
  return { type: TOGGLE_MODAL, index };
}

export function addYak(text) {
  return { type: ADD_YAK, text };
}

export function setFeedLocationFilter(filter) {
  return { type: SET_FEEDLOCATION_FILTER, filter };
}


export function checkConnection() {
  return dispatch => {
    dispatch({type: CONNECTION_CHECKING});
    setTimeout(() => dispatch({type: CONNECTION_CHECKED}), 5000);
  };
}

export function goOnline() {
  return {
    type: CONNECTION_ONLINE
  };
}

export function goOffline() {
  return {
    type: CONNECTION_OFFLINE
  };
}
