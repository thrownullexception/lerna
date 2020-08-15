import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateSkillsTable1593292900403 extends BaseMigration implements MigrationInterface {
  protected table = 'skills';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTable(queryRunner, [
      {
        name: 'name',
        type: 'varchar',
      },
      {
        name: 'description',
        type: 'text',
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
    await this.uniqueIndex(queryRunner, ['name']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner);
  }
}
