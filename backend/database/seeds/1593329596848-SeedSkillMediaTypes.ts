import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseSeed } from './base/base-seed';

export class SeedSkillMediaTypes1593329596848 extends BaseSeed implements MigrationInterface {
  table = 'skill_media_types';
  systemEnumerationFields = [
    {
      systemName: 'video',
      displayName: 'Video',
    },
    {
      systemName: 'pdf',
      displayName: 'PDF',
    },
    {
      systemName: 'youtube',
      displayName: 'Youtube',
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.seedSytemEnumerationTable(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.deSeedSytemEnumerationTable(queryRunner);
  }
}
