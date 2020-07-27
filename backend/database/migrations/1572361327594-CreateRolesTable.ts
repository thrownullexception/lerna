import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration } from './base/base-migration';

export class CreateRolesTable1572361327594 extends BaseMigration implements MigrationInterface {
  protected table = 'roles';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTable(queryRunner, [
      {
        name: 'name',
        type: 'varchar',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner);
  }
}
