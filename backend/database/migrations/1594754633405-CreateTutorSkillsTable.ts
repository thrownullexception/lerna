import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateTutorSkillsTable1594754633405 extends BaseMigration
  implements MigrationInterface {
  protected table = 'tutor_skills';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createSystemTable(queryRunner, 'skill_levels');
    await this.createTable(queryRunner, [
      {
        name: 'user_id',
        type: 'uuid',
      },
      {
        name: 'skill_id',
        type: 'uuid',
      },
      {
        name: 'level_system_name',
        type: 'varchar',
      },
      {
        name: 'rate',
        type: 'int',
      },
      {
        name: 'years',
        type: 'int',
      },
    ]);
    await this.reference(queryRunner, {
      table: 'users',
      referencedColumnHere: 'user_id',
      referenceAction: ReferenceAction.Cascade,
    });
    await this.reference(queryRunner, {
      table: 'skills',
      referencedColumnHere: 'skill_id',
      referenceAction: ReferenceAction.Cascade,
    });
    await this.reference(queryRunner, {
      table: 'skill_levels',
      referencedColumnHere: 'level_system_name',
      referencedColumnThere: 'system_name',
      referenceAction: ReferenceAction.Restrict,
    });
    await this.uniqueIndex(queryRunner, ['skill_id', 'user_id']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner, 'tutor_skills');
    await this.drop(queryRunner, 'skill_levels');
  }
}
