import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseSeed } from './base/base-seed';

export class SeedSkillLevels1594756216627 extends BaseSeed implements MigrationInterface {
  table = 'skill_levels';
  systemEnumerationFields = [
    {
      systemName: 'level_1',
      displayName: 'Beginner',
    },
    {
      systemName: 'level_2',
      displayName: 'Intermediate',
    },
    {
      systemName: 'level_3',
      displayName: 'Advanced',
    },
    {
      systemName: 'level_4',
      displayName: 'Expert',
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.seedSytemEnumerationTable(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.deSeedSytemEnumerationTable(queryRunner);
  }
}
