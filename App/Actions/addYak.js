'use strict';

import ActionTypes from '../Constants/ActionTypes';
import database from '../Database/Database';

export function addNewYak(yakContent) {
  return dispatch => {
    dispatch(addYakRequestedAction());
    const yakRef = database.ref('/yaks');
    yakRef.push({
      yakContent
    })
    .then(() => {
      dispatch(addYakFufilledAction({ yakContent }));
    })
    .catch((error) => {
      console.log(error);
      dispatch(addYakRejectedAction());
    });
  };
}

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
