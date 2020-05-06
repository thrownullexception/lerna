import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { faqsReducer } from '../app/faqs/faqs.reducers';
import { authReducer } from '../app/auth/auth.reducers';
import { history } from './history';

const rootReducers = combineReducers({
  router: connectRouter(history),
  faqs: faqsReducer,
  auth: authReducer,
});

export default rootReducers;

export type IStore = ReturnType<typeof rootReducers>;
