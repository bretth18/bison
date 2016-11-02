'use strict';

import database from '../Database/Database';
import ActionTypes from '../Constants/ActionTypes';


export function watchYakAddedEvent(dispatch) {
  database.ref('/yaks').on('child_added', (snap) => {
    dispatch(getYakAddedAction(snap.val()));
  });
}

function getYakAddedAction(yakContent) {
  return {
    type: ActionTypes.YakAdded,
    yakContent
  };
}
