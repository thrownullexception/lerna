import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration } from './base/base-migration';

export class CreateSkillResourcesTable1593326289145 extends BaseMigration
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    this.table = 'skill_media_types';
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
    this.table = 'skill_resources';

    await this.createTable(queryRunner, [
      {
        name: 'skill_id',
        type: 'uuid',
      },
      {
        name: 'title',
        type: 'varchar',
      },
      {
        name: 'link',
        type: 'varchar',
      },
      {
        name: 'media_type',
        type: 'varchar',
      },
      {
        name: 'is_free',
        type: 'boolean',
      },
    ]);
    await this.reference(queryRunner, {
      table: 'skills',
      referencedColumnHere: 'skill_id',
    });
    await this.reference(queryRunner, {
      table: 'skill_media_types',
      referencedColumnHere: 'media_type',
      referencedColumnThere: 'system_name',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner);
  }
}
