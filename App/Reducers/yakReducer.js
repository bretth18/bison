'use strict';

import ActionTypes from '../Constants/ActionTypes';

const initialState = {
  yakList: [],
  connectionChecked: false
};

export function yakReducer(state = initialState, action) {
  let yakList;

  console.log(action);
  switch(action.type) {

    //new
    case ActionTypes.addYak:
      yakList = state.yakList.concat([action.yakData]).sort((a,b) => b.time - a.time);

      return {
        ...state,
        yakList: yakList
      };

    case ActionTypes.removeYak:
      yakList: state.yakList.slice(0)
      const index = yakList.map(i => i.id).indexOf(action.id);
      yakList.splice(index, 1);

      return {
        ...state,
        yakList: yakList
      };

    case ActionTypes.connectionChecking:
      return {
        ...state,
        connectionChecked: false
      };

    case ActionTypes.connectionChecked:
      return {
        ...state,
        connectionChecked: true
      };

    case ActionTypes.connectionOnline:
      return {
        ...state,
        connectionChecked: true,
        connected: true,
      };

    case ActionTypes.connectionOffline:
      return {
        ...state,
        connectionChecked: true,
        connected: false
      };




    // case ActionTypes.AddYakRequested: {
    //   return Object.assign({}, state, {
    //     inProgress: true,
    //     error: '',
    //     success: '',
    //   });
    // }
    //
    // case ActionTypes.AddYakRejected: {
    //   return Object.assign({}, state, {
    //     inProgress: false,
    //     error: 'Error while adding new post',
    //   });
    // }
    //
    // case ActionTypes.AddYakFufilled: {
    //   const newState = Object.assign({}, state, {
    //     inProgress: false,
    //     success: 'Added post',
    //   });
    //
    //   return newState;
    // }
    //
    // case ActionTypes.YakAdded: {
    //   const newState = Object.assign({}, state);
    //   newState.yaks = newState.yaks || [];
    //   newState.yaks = newState.yaks.slice();
    //   newState.yaks.push(action.yak);
    //   return newState;
    // }
    default:
      return state;

    }
}
