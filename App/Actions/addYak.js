'use strict';

import ActionTypes from '../Constants/ActionTypes';

// * New */
export function addYak(yakData) {
  return {
    type: ActionTypes.addYak,
    yakData: yakData
  };
}

export function removeYak(id) {
  return {
    type: ActionTypes.removeYak,
    id: id
  };
}

export function checkConnection() {
  return dispatch => {
    dispatch({type: ActionTypes.connectionChecking});
    setTimeout(() => dispatch({type: ActionTypes.connectionChecked}), 5000);
  };
}

export function goOnline() {
  return {
    type: ActionTypes.connectionOnline
  };
}

export function goOffline() {
  return {
    type: ActionTypes.connectionOffline
  };
}

// * END */
