import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration } from './base/base-migration';

export class CreatePermissionsTable1593940630649 extends BaseMigration
  implements MigrationInterface {
  protected table = 'permissions';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.createTable(queryRunner, [
      {
        name: 'permission',
        type: 'varchar',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.drop(queryRunner);
  }
}
