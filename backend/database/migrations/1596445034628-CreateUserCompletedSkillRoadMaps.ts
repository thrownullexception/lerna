import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateUserCompletedSkillRoadMaps1596445034628 extends BaseMigration
  implements MigrationInterface {
  protected table = 'user_completed_skill_road_maps';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTable(queryRunner, [
      {
        name: 'user_id',
        type: 'uuid',
      },
      {
        name: 'skill_road_map_id',
        type: 'uuid',
      },
    ]);
    await this.reference(queryRunner, {
      table: 'users',
      referencedColumnHere: 'user_id',
      referenceAction: ReferenceAction.Cascade,
    });
    await this.reference(queryRunner, {
      table: 'skill_road_maps',
      referencedColumnHere: 'skill_road_map_id',
      referenceAction: ReferenceAction.Cascade,
    });
    await this.uniqueIndex(queryRunner, ['skill_road_map_id', 'user_id']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner);
  }
}
