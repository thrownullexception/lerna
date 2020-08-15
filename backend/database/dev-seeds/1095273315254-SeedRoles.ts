import { MigrationInterface, QueryRunner } from 'typeorm';
import { UUIDs, BaseSeed } from './base';

export class SeedRoles1095273315254 extends BaseSeed implements MigrationInterface {
  table = 'roles';
  data = [
    {
      id: UUIDs.roles[0],
      name: 'SUPER_ADMIN',
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.seedDevelopmentData(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
