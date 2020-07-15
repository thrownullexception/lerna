import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateSkillRoadMapsTable1593293404751 extends BaseMigration
  implements MigrationInterface {
  protected table = 'skill_road_maps';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTable(queryRunner, [
      {
        name: 'skill_id',
        type: 'uuid',
      },
      {
        name: 'level',
        type: 'int',
        isNullable: true,
      },
      {
        name: 'order',
        type: 'int',
        isNullable: true,
      },
      {
        name: 'title',
        type: 'varchar',
      },
      {
        name: 'description',
        type: 'text',
      },
    ]);
    await this.reference(queryRunner, {
      table: 'skills',
      referencedColumnHere: 'skill_id',
      referenceAction: ReferenceAction.Cascade,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner);
  }
}
