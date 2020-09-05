import { Session } from '../sessions.entity';
import { StringHelpers } from 'src/shared/helpers';

export class StudentSessionTransformer {
  id: string;
  title: string;
  statusDisplayName: string;
  statusSystemName: string;
  description: string;
  statusTheme: string;
  skills: string[];
  createdAt: string;

  constructor(session: Session) {
    this.id = session.id;
    this.title = session.title;
    this.statusSystemName = session.statusSystemName;
    this.statusDisplayName = session.status.displayName;
    this.statusTheme = session.status.theme;
    this.description = StringHelpers.plainAndEllipsize(session.description, 120);
    this.createdAt = session.createdAt;
    this.skills = session.skills.map(({ skill: { name } }) => name);
  }
}
