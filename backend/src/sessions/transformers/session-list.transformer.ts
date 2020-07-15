import { Session } from '../sessions.entity';

export class SessionListTransformer {
  id: string;
  studentName: string;
  studentId: string;
  tutorName: string;
  tutorId: string;
  title: string;
  description: string;
  levelName: string;
  rate: number;
  years: number;
  skillName: string;
  constructor(session: Session) {
    this.title = session.title;
  }
}
