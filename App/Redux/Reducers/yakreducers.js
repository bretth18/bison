'use strict';

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


export default function yaksReducer(state = [], action) {
  switch(action.type) {
    case ADD_YAK:
      return [...state,{ text: action.text}];

    case TOGGLE_MODAL:

    case CONNECTION_CHECKING:
      return {
        ...state,
        connectionChecked: false
      };
    case CONNECTION_CHECKED:
      return {
        ...state,
        connectionChecked: true
      };
    case CONNECTION_ONLINE:
      return {
        ...state,
        connectionChecked: true,
        connected: true
      };
    case CONNECTION_OFFLINE:
      return {
        ...state,
        connectionChecked: true,
        connected: false
      };

    default:
      return state;

    }
}

module.exports = yakRedux;
