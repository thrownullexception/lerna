import { IsNotEmpty, IsUUID } from 'class-validator';
import { SessionCandidate } from '../session-candidates.entity';
import { Unique } from '../../shared/constraints';

export class ShortListCandidateDTO {
  @Unique<ShortListCandidateDTO>(
    {
      repositoryModel: SessionCandidate,
      otherColumn: 'candidateId',
    },
    {
      message: 'Candidate was previously shortlisted',
    },
  )
  @IsUUID(4)
  @IsNotEmpty({
    message: 'Session ID is required',
  })
  sessionId: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'Candidate ID is required',
  })
  candidateId: string;
}
