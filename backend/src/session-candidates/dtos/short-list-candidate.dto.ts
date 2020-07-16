import { IsNotEmpty, IsUUID } from 'class-validator';

export class ShortListCandidateDTO {
  @IsNotEmpty({
    message: 'Session ID is required',
  })
  @IsUUID(4)
  sessionId: string;

  @IsNotEmpty({
    message: 'Candidate ID is required',
  })
  @IsUUID(4)
  candidateId: string;
}
