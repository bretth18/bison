'use strict';

// action types:

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const ADD_YAK = 'ADD_YAK';
export const SET_FEEDLOCATION_FILTER = 'SET_FEEDLOCATION_FILTER';

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
