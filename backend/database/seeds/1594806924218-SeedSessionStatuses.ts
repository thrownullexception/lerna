import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseSeed, StatusThemes } from './base/base-seed';

export class SeedSessionStatuses1594806924218 extends BaseSeed implements MigrationInterface {
  table = 'session_statuses';
  systemEnumerationFields = [
    {
      systemName: 'initialized',
      displayName: 'Initialized',
      theme: StatusThemes.Default,
    },
    {
      systemName: 'interviewing',
      displayName: 'Interviewing Candidates',
      theme: StatusThemes.Primary,
    },
    {
      systemName: 'selected_tutor',
      displayName: 'Selected Tutor',
      theme: StatusThemes.Success,
    },
  ];
  public async up(queryRunner: QueryRunner): Promise<void> {
    this.seedSytemEnumerationTable(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.deSeedSytemEnumerationTable(queryRunner);
  }
}
