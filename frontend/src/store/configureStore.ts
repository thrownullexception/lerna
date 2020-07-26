import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { Reducer } from 'react';
import { Action } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import { history } from './history';
import { rootReducers } from './rootReducers';

const middleware = [...getDefaultMiddleware(), logger, routerMiddleware(history)];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['skills'],
  stateReconciler: autoMergeLevel2,
};

// const persistedReducer = persistReducer(
//   persistConfig,
//   rootReducers as Reducer<unknown, Action<any>>,
// );

export const store = configureStore({
  reducer: rootReducers,
  // persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});
