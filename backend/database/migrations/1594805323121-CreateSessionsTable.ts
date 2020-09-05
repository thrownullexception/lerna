import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateSessionsTable1594805323121 extends BaseMigration implements MigrationInterface {
  protected table = 'sessions';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createSystemTable(queryRunner, 'session_statuses', [
      {
        name: 'theme',
        type: 'varchar',
      },
    ]);
    await this.createTable(queryRunner, [
      {
        name: 'student_id',
        type: 'uuid',
      },
      {
        name: 'title',
        type: 'varchar',
      },
      {
        name: 'description',
        type: 'text',
      },
      {
        name: 'budget_from',
        type: 'int',
      },
      {
        name: 'budget_to',
        type: 'int',
      },
      {
        name: 'questions_duration',
        type: 'int', // mins
        isNullable: true,
      },
      {
        name: 'pass_percentage',
        type: 'int',
        isNullable: true,
      },
      {
        name: 'no_response_duration',
        type: 'int', // hours
        isNullable: true,
      },
      {
        name: 'status_system_name',
        type: 'varchar',
      },
      {
        name: 'tutor_id',
        type: 'uuid',
        isNullable: true,
      },
    ]);
    await this.reference(queryRunner, {
      table: 'users',
      referencedColumnHere: 'student_id',
      referenceAction: ReferenceAction.Restrict,
    });
    await this.reference(queryRunner, {
      table: 'users',
      referencedColumnHere: 'tutor_id',
      referenceAction: ReferenceAction.Restrict,
    });
    await this.reference(queryRunner, {
      table: 'session_statuses',
      referencedColumnHere: 'status_system_name',
      referencedColumnThere: 'system_name',
      referenceAction: ReferenceAction.Restrict,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner, 'sessions');
    await this.drop(queryRunner, 'session_statuses');
  }
}
