import { SessionCandidate } from '../../session-candidates/session-candidates.entity';

export class StudentSessionTransformer {
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
  constructor(session: SessionCandidate) {
    this.title = session.session.title;
  }
}
