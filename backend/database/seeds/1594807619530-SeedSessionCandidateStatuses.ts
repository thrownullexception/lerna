import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseSeed } from './base/base-seed';

export class SeedSessionCandidateStatuses1594807619530 extends BaseSeed
  implements MigrationInterface {
  table = 'session_candidate_statuses';
  systemEnumerationFields = [
    {
      systemName: 'sent',
      displayName: 'Sent',
    },
    {
      systemName: 'opened',
      displayName: 'Opened Invitation',
    },
    {
      systemName: 'no_response',
      displayName: 'No Response',
    },
    {
      systemName: 'rejected',
      displayName: 'Rejected Invitation',
    },
    {
      systemName: 'interested',
      displayName: 'Accepted Invitation',
    },
    {
      systemName: 'passed_questions',
      displayName: 'Passed Questions',
    },
    {
      systemName: 'failed_questions',
      displayName: 'Failed Questions',
    },
    {
      systemName: 'selected',
      displayName: 'Selected',
    },
    {
      systemName: 'already_filled',
      displayName: 'Already Filled',
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.seedSytemEnumerationTable(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.deSeedSytemEnumerationTable(queryRunner);
  }
}
// TODO opened/sent after 24 hours is no_response
