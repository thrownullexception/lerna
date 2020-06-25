import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { BaseMigration } from './base/base-migration';

export class Faqs1572572330363 extends BaseMigration
  implements MigrationInterface {
  protected table = 'faqs';
  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.createTable(queryRunner, [
      {
        name: 'question',
        type: 'varchar',
      },
      {
        name: 'answer',
        type: 'text',
      },
      {
        name: 'admin_id',
        type: 'uuid',
        isNullable: true,
      },
    ]);

    await this.reference(queryRunner, 'users', 'admin_id', true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.drop(queryRunner);
  }
}
