import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
// import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { history } from './history';
import rootReducers from './rootReducers';

const persistConfig = {
  key: 'root',
  storage,
  // stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const middleware = [thunk, routerMiddleware(history)];

export const configureStore = () => {
  const store = createStore(persistedReducer, compose(applyMiddleware(...middleware)));
  return store;
};
