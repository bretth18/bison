import { combineReducers } from 'redux';
import { yakReducer } from './yakReducer';

const rootReducer = combineReducers({
  yak: yakReducer
});

export default rootReducer;
