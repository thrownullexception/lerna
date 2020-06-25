import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration } from './base/base-migration';

export class CreateUsersTable1572487741663 extends BaseMigration
  implements MigrationInterface {
  protected table = 'users';
  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.createTable(queryRunner, [
      {
        name: 'username',
        type: 'varchar',
        length: '32',
        isUnique: true,
      },
      {
        name: 'email',
        type: 'varchar',
        length: '32',
        isUnique: true,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '128',
        isNullable: true,
      },
      {
        name: 'registered_by',
        type: 'smallint',
      },
      {
        name: 'referred_by',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'role_id',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'verified',
        type: 'boolean',
        default: false,
      },
    ]);
    await this.reference(queryRunner, 'roles', 'role_id');
    await this.index(queryRunner, 'email');
    await this.index(queryRunner, 'username');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.drop(queryRunner);
  }
}
