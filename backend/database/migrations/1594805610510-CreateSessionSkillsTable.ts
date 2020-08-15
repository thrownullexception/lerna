import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateSessionSkillsTable1594805610510 extends BaseMigration
  implements MigrationInterface {
  protected table = 'session_skills';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTable(queryRunner, [
      {
        name: 'session_id',
        type: 'uuid',
      },
      {
        name: 'skill_id',
        type: 'uuid',
      },
      {
        name: 'level',
        type: 'varchar',
      },
    ]);
    await this.reference(queryRunner, {
      table: 'sessions',
      referencedColumnHere: 'session_id',
      referenceAction: ReferenceAction.Cascade,
    });
    await this.reference(queryRunner, {
      table: 'skill_levels',
      referencedColumnHere: 'level',
      referencedColumnThere: 'system_name',
      referenceAction: ReferenceAction.Restrict,
    });
    await this.reference(queryRunner, {
      table: 'skills',
      referencedColumnHere: 'skill_id',
      referenceAction: ReferenceAction.Cascade,
    });
    await this.uniqueIndex(
      queryRunner,
      ['skill_id', 'session_id'], // :eyes
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner);
  }
}
