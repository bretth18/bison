'use strict';

import { ActionConst } from 'react-native-router-flux';

const initialState = {
  scene: {},
};

export function navReducer(state = initialState, action = {}) {

  switch (action.type) {

    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
      };

    case ActionConst.BACK:
      return {
        ...state,
        scene: action.scene
      };

    case ActionConst.RESET:
      return {
        ...state,
        scene: action.scene
      };

    default:
      return state;
  }
}
