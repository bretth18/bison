import { combineReducers } from 'redux';
import { yakReducer } from './yakReducer';
import { navReducer } from './navReducer';

const rootReducer = combineReducers({
  yaks: yakReducer,
  routes: navReducer,
});

export default rootReducer;
