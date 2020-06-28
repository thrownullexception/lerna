import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseSeed } from './base/base-seed';

export class SeedAccountModes1593354437143 extends BaseSeed
  implements MigrationInterface {
  table = 'account_modes';
  systemEnumerationFields = [
    {
      systemName: 'tutor',
      displayName: 'Tutor',
    },
    {
      systemName: 'student',
      displayName: 'Student',
    },
    {
      systemName: 'admin',
      displayName: 'Admin',
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.seedSytemEnumerationTable(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.deSeedSytemEnumerationTable(queryRunner);
  }
}
