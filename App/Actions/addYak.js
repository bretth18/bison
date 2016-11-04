'use strict';

import ActionTypes from '../Constants/ActionTypes';
import database from '../Database/Database';

// export function addNewYak(yakContent) {
//   return dispatch => {
//     dispatch(addYakRequestedAction());
//     const yakRef = database.ref('/yaks');
//     yakRef.push({
//       yakContent
//     })
//     .then(() => {
//       dispatch(addYakFufilledAction({ yakContent }));
//     })
//     .catch((error) => {
//       console.log(error);
//       dispatch(addYakRejectedAction());
//     });
//   };
// }

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

function addYakRequestedAction() {
  return {
    type: ActionTypes.AddYakRequested
  };
}

function addYakRejectedAction() {
  return {
    type: ActionTypes.AddYakRejected
  };
}

function addYakFufilledAction(yakContent) {
  return {
    type: ActionTypes.AddYakFufilled,
    yakContent
  };
}
