import { IsNotEmpty, IsIn } from 'class-validator';
import { SessionCandidateStatusTypes } from 'src/session-candidate-statuses/session-candidate-statuses.types';

export class CandidateResponseDTO {
  @IsNotEmpty({
    message: 'Candidate Response is required',
  })
  @IsIn([
    SessionCandidateStatusTypes.Interested,
    SessionCandidateStatusTypes.Opened,
    SessionCandidateStatusTypes.Rejected,
  ])
  response: SessionCandidateStatusTypes;
}
