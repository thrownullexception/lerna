import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateSessionQuizResponsesTable1594900631548 extends BaseMigration
  implements MigrationInterface {
  protected table = 'session_quiz_responses';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTable(queryRunner, [
      {
        name: 'session_quiz_id',
        type: 'uuid',
      },
      {
        name: 'user_id',
        type: 'uuid',
      },
      {
        name: 'session_id',
        type: 'uuid',
      },
      {
        name: 'response',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'is_correct',
        type: 'boolean',
        default: false,
      },
    ]);

    await this.reference(queryRunner, {
      table: 'session_quizzes',
      referencedColumnHere: 'session_quiz_id',
      referenceAction: ReferenceAction.Restrict,
    });

    await this.reference(queryRunner, {
      table: 'sessions',
      referencedColumnHere: 'session_id',
      referenceAction: ReferenceAction.Restrict,
    });

    await this.reference(queryRunner, {
      table: 'users',
      referencedColumnHere: 'user_id',
      referenceAction: ReferenceAction.Restrict,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner);
  }
}
