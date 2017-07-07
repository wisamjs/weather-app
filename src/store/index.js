import { applyMiddleware, createStore, combineReducers } from 'redux';
import * as reducers from '../reducers/index';
import logger from 'redux-logger'
import { routerReducer } from 'react-router-redux'

import createSagaMiddleware  from 'redux-saga';

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});
import rootSaga from '../sagas/';

const sagaMiddleware = createSagaMiddleware();

export default (initialState) => {
  const middleware = [
    logger,
    sagaMiddleware,
  ];

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
