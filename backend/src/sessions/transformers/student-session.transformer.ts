import { Session } from '../sessions.entity';

export class StudentSessionTransformer {
  id: string;
  title: string;
  statusName: string;
  skills: string[];
  createdAt: string;

  constructor(session: Session) {
    this.id = session.id;
    this.title = session.title;
    this.statusName = session.status.displayName;
    this.createdAt = session.createdAt;
    this.skills = session.skills.map(({ skill: { name } }) => name);
  }
}
