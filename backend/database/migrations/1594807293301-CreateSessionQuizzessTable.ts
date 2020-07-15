import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateSessionQuizzesTable1594807293301 extends BaseMigration
  implements MigrationInterface {
  protected table = 'session_quizzes';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTable(queryRunner, [
      {
        name: 'session_id',
        type: 'uuid',
      },
      {
        name: 'question',
        type: 'varchar',
      },
      {
        name: 'option_a',
        type: 'varchar',
      },
      {
        name: 'option_b',
        type: 'varchar',
      },
      {
        name: 'option_c',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'option_d',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'option_e',
        type: 'varchar',
        isNullable: true,
      },
    ]);
    await this.reference(queryRunner, {
      table: 'sessions',
      referencedColumnHere: 'session_id',
      referenceAction: ReferenceAction.Cascade,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner);
  }
}
