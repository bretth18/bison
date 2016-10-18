'use strict';

import { combineReducers } from 'redux';
import { TOGGLE_MODAL, ADD_YAK, SET_FEEDLOCATION_FILTER,
         feedLocationFilters } from '../Actions/actions';


function feedLocationFilter(state, action) {
  switch(action.type) {
    case SET_FEEDLOCATION_FILTER:
      return action.filter;

    default:
      return state;
  }
}


function yaks(state = [], action) {
  switch(action.type) {
    case ADD_YAK:
      return [...state,{ text: action.text}];

    case TOGGLE_MODAL:

    default:
      return state;

    }
}

const yakRedux = combineReducers({
  feedLocationFilter,
  yaks
});

module.exports = yakRedux;
