import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { history } from './history';

import { faqsSlice } from '../app/faqs/faqs.ducks';
import { requestStatusSlice } from '../app/request-status/request-status.ducks';
import { sessionsSlice } from '../app/sessions/sessions.ducks';
import { authSlice } from '../app/auth/auth.ducks';
import { skillsSlice } from '../app/skills/skills.ducks';

export const rootReducers = combineReducers({
  router: connectRouter(history),
  faqs: faqsSlice.reducer,
  requestStatus: requestStatusSlice.reducer,
  sessions: sessionsSlice.reducer,
  auth: authSlice.reducer,
  skills: skillsSlice.reducer,
});

export type IStore = ReturnType<typeof rootReducers>;
