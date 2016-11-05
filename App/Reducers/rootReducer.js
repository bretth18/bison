import { combineReducers } from 'redux';
import { yakReducer } from './yakReducer';
import { navReducer } from './navReducer';
import { yakViewReducer } from './yakViewReducer';

const rootReducer = combineReducers({
  yaks: yakReducer,
  routes: navReducer,
  yakView: yakViewReducer,
});

export default rootReducer;
