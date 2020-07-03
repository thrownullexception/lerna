import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration } from './base/base-migration';

export class CreateSkillRelationsTable1593331031697 extends BaseMigration
  implements MigrationInterface {
  table = 'skill_relations';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTable(queryRunner, [
      {
        name: 'skill_a_id',
        type: 'uuid',
      },
      {
        name: 'skill_b_id',
        type: 'uuid',
      },
    ]);
    await this.reference(queryRunner, {
      table: 'skills',
      referencedColumnHere: 'skill_a_id',
    });
    await this.reference(queryRunner, {
      table: 'skills',
      referencedColumnHere: 'skill_b_id',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner);
  }
}
