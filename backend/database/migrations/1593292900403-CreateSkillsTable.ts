import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration } from './base/base-migration';

export class CreateSkillsTable1593292900403 extends BaseMigration
  implements MigrationInterface {
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
        name: 'is_path',
        type: 'boolean',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner);
  }
}
