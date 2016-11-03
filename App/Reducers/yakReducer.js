'use strict';

import ActionTypes from '../Constants/ActionTypes';

export function yakReducer(state = {}, action) {
  switch(action.type) {

    case ActionTypes.AddYakRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: '',
      });
    }

    case ActionTypes.AddYakRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error while adding new post',
      });
    }

    case ActionTypes.AddYakFufilled: {
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Added post',
      });

      return newState;
    }

    case ActionTypes.YakAdded: {
      const newState = Object.assign({}, state);
      newState.yaks = newState.yaks || [];
      newState.yaks = newState.yaks.slice();
      newState.yaks.push(action.yak);
      return newState;
    }
    default:
      return state;

    }
}
