import { combineReducers } from 'redux';
import { yakReducer } from './yakReducer';

const rootReducer = combineReducers({
  yaks: yakReducer
});

export default rootReducer;
