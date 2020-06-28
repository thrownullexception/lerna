import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration } from './base/base-migration';

export class CreateProfileTable1593354718008 extends BaseMigration
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    this.table = 'genders';

    await this.createTable(queryRunner, [
      {
        name: 'system_name',
        type: 'varchar',
      },
      {
        name: 'display_name',
        type: 'varchar',
      },
    ]);

    this.uniqueIndex(queryRunner, 'system_name');

    this.table = 'profiles';

    await this.createTable(queryRunner, [
      {
        name: 'userId',
        type: 'uuid',
      },
      {
        name: 'first_name',
        type: 'varchar',
        length: '32',
        isNullable: true,
      },
      {
        name: 'last_name',
        type: 'varchar',
        length: '32',
        isNullable: true,
      },
      {
        name: 'phone_number',
        type: 'varchar',
        length: '32',
        isUnique: true,
        isNullable: true, // Will this work
      },
      {
        name: 'picture',
        type: 'varchar',
        length: '255',
        isNullable: true,
      },
      {
        name: 'gender',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'online',
        type: 'boolean',
        default: false,
      },
      {
        name: 'dob',
        type: 'date',
        isNullable: true,
      },
    ]);
    await this.reference(queryRunner, {
      table: 'genders',
      referencedColumnHere: 'gender',
      referencedColumnThere: 'system_name',
    });
    await this.reference(queryRunner, {
      table: 'users',
      referencedColumnHere: 'userId',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.drop(queryRunner, 'profiles');
    await this.drop(queryRunner, 'genders');
  }
}
