import { routerMiddleware } from 'connected-react-router';
import { Reducer } from 'react';
import { Action } from 'typesafe-actions';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { history } from './history';
import rootReducers from './rootReducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['skills'],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducers as Reducer<unknown, Action<any>>,
);

const middleware = [thunk, routerMiddleware(history)];

export const configureStore = () => {
  const store = createStore(persistedReducer, compose(applyMiddleware(...middleware)));
  return store;
};
