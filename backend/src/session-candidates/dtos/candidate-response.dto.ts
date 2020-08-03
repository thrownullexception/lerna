import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { SessionCandidateStatusTypes } from '../../session-candidate-statuses/session-candidate-statuses.types';

export class CandidateResponseDTO {
  @IsIn([
    SessionCandidateStatusTypes.Interested,
    SessionCandidateStatusTypes.Opened,
    SessionCandidateStatusTypes.Rejected,
  ])
  @IsNotEmpty({
    message: 'Candidate Response is required',
  })
  response: SessionCandidateStatusTypes;

  @IsOptional()
  reason: string;
}
