import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseSeed } from './base/base-seed';

export class SeedTutorSkillLevels1594756216627 extends BaseSeed implements MigrationInterface {
  table = 'tutor_skills_levels';
  systemEnumerationFields = [
    {
      systemName: 'beginner',
      displayName: 'Beginner',
    },
    {
      systemName: 'intermediate',
      displayName: 'Intermediate',
    },
    {
      systemName: 'advanced',
      displayName: 'Advanced',
    },
    {
      systemName: 'expert',
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
