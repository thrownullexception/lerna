import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { history } from './history';
import { faqsReducer } from '../app/faqs/faqs.reducers';
import { authReducer } from '../app/auth/auth.reducers';
import { skillsReducer } from '../app/skills/skills.reducers';
import { formsReducer } from '../app/forms/forms.reducers';
import { sessionReducer } from '../app/sessions/sessions.reducers';

const rootReducers = combineReducers({
  router: connectRouter(history),
  faqs: faqsReducer,
  skills: skillsReducer,
  auth: authReducer,
  form: formsReducer,
  sessions: sessionReducer,
});

export default rootReducers;

export type IStore = ReturnType<typeof rootReducers>;
