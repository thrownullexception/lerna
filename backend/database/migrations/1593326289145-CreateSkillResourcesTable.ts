import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateSkillResourcesTable1593326289145 extends BaseMigration
  implements MigrationInterface {
  protected table = 'skill_resources';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createSystemTable(queryRunner, 'skill_media_types');

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
      referenceAction: ReferenceAction.Cascade,
    });
    await this.reference(queryRunner, {
      table: 'skill_media_types',
      referencedColumnHere: 'media_type',
      referencedColumnThere: 'system_name',
      referenceAction: ReferenceAction.Restrict,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner, 'skill_resources');
    await this.drop(queryRunner, 'skill_media_types');
  }
}
