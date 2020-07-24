import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { SessionCandidateStatusTypes } from '../../session-candidate-statuses/session-candidate-statuses.types';

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

  @IsOptional()
  reason: string;
}
