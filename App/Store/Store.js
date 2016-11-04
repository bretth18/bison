'use strict';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../Reducers/rootReducer';
import { composeWithDevTools } from 'remote-redux-devtools';

const logger = createLogger();

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
const store = createStore(rootReducer, {},applyMiddleware(thunk, logger));

export default store;
