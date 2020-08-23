import { SessionCandidate } from '../session-candidates/session-candidates.entity';

export class TutorSessionTransformer {
  id: string;
  statusName: string;
  createdAt: string;
  title: string;
  skills: string[];

  constructor(sessionCandidate: SessionCandidate) {
    this.id = sessionCandidate.id;
    this.title = sessionCandidate.session.title;
    this.statusName = sessionCandidate.session.status.displayName;
    this.createdAt = sessionCandidate.createdAt;
    this.skills = sessionCandidate.session.skills.map(({ skill: { name } }) => name);
  }
}
