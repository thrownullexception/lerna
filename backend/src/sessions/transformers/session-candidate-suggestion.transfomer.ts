import { Session } from '../sessions.entity';
import { TutorSkill } from '../../tutor-skills/tutor-skills.entity';

export class SessionCandidateSuggestionTransformer {
  userId: string;
  rate: number;
  name: string;
  image: string;
  skills: TutorSkill;

  constructor(session: Session) {
    // this.id = session.id;
    // this.title = session.title;
    // this.statusName = session.status.displayName;
    // this.createdAt = session.createdAt;
    // this.skills = session.skills.map(({skill: { name } }) => name)
  }
}
