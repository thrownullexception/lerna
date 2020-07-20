import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateFaqsTable1572572330363 extends BaseMigration implements MigrationInterface {
  protected table = 'faqs';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.createTable(queryRunner, [
      {
        name: 'question',
        type: 'varchar',
      },
      {
        name: 'answer',
        type: 'text',
      },
      {
        name: 'account_mode_system_name',
        type: 'varchar',
      },
      {
        name: 'last_touched_by_id',
        type: 'uuid',
        isNullable: true,
      },
    ]);

    await this.reference(queryRunner, {
      table: 'users',
      referencedColumnHere: 'last_touched_by_id',
      referenceAction: ReferenceAction.SetNull,
    });
    await this.reference(queryRunner, {
      table: 'account_modes',
      referencedColumnHere: 'account_mode_system_name',
      referencedColumnThere: 'system_name',
      referenceAction: ReferenceAction.Restrict,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.drop(queryRunner);
  }
}
