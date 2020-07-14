import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration } from './base/base-migration';

export class CreateUsersTable1572487741663 extends BaseMigration implements MigrationInterface {
  protected table = 'users';
  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.createSystemTable(queryRunner, 'account_modes');

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
        name: 'role_id',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'account_mode',
        type: 'varchar',
      },
      {
        name: 'verified',
        type: 'boolean',
        default: false,
      },
    ]);
    await this.reference(queryRunner, {
      table: 'roles',
      referencedColumnHere: 'role_id',
    });
    await this.reference(queryRunner, {
      table: 'account_modes',
      referencedColumnHere: 'account_mode',
      referencedColumnThere: 'system_name',
    });
    await this.index(queryRunner, 'email');
    await this.index(queryRunner, 'username');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.drop(queryRunner, 'users');
    await this.drop(queryRunner, 'account_modes');
  }
}
