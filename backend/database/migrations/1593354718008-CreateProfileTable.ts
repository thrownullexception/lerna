import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateProfileTable1593354718008 extends BaseMigration implements MigrationInterface {
  protected table = 'profiles';
  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.createSystemTable(queryRunner, 'genders');

    await this.createTable(queryRunner, [
      {
        name: 'user_id',
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
        name: 'last_online',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
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
      referenceAction: ReferenceAction.Restrict,
    });
    await this.reference(queryRunner, {
      table: 'users',
      referencedColumnHere: 'user_id',
      referenceAction: ReferenceAction.Cascade,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.drop(queryRunner, 'profiles');
    await this.drop(queryRunner, 'genders');
  }
}
