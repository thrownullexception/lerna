import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { history } from './history';

import { faqsSlice } from '../app/faqs/faqs.ducks';
import { requestStatusSlice } from '../app/request-status/request-status.ducks';
import { sessionsSlice } from '../app/sessions/sessions.ducks';
import { authSlice } from '../app/auth/auth.ducks';
import { skillsSlice } from '../app/skills/skills.ducks';
import { studentSkillsSlice } from '../app/student-skills/student-skills.ducks';
import { tutorSkillsSlice } from '../app/tutor-skills/tutor-skills.ducks';
import { skillLevelsSlice } from '../app/skill-levels/skill-levels.ducks';

export const rootReducers = combineReducers({
  router: connectRouter(history),
  faqs: faqsSlice.reducer,
  requestStatus: requestStatusSlice.reducer,
  sessions: sessionsSlice.reducer,
  auth: authSlice.reducer,
  skills: skillsSlice.reducer,
  studentSkills: studentSkillsSlice.reducer,
  tutorSkills: tutorSkillsSlice.reducer,
  skillLevels: skillLevelsSlice.reducer,
});

export type IStore = ReturnType<typeof rootReducers>;
