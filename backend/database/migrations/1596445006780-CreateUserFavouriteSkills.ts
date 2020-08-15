import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateUserFavouriteSkills1596445006780 extends BaseMigration
  implements MigrationInterface {
  protected table = 'user_favourite_skills';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTable(queryRunner, [
      {
        name: 'user_id',
        type: 'uuid',
      },
      {
        name: 'skill_id',
        type: 'uuid',
      },
    ]);
    await this.reference(queryRunner, {
      table: 'users',
      referencedColumnHere: 'user_id',
      referenceAction: ReferenceAction.Cascade,
    });
    await this.reference(queryRunner, {
      table: 'skills',
      referencedColumnHere: 'skill_id',
      referenceAction: ReferenceAction.Cascade,
    });
    await this.uniqueIndex(queryRunner, ['skill_id', 'user_id']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner);
  }
}
