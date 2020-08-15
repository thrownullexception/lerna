import { MigrationInterface, QueryRunner } from 'typeorm';
import { UUIDs, BaseSeed } from './base';

export class SeedProfiles1595102939349 extends BaseSeed implements MigrationInterface {
  table = 'profiles';
  data = [
    {
      user_id: UUIDs.users[0],
      first_name: 'John',
      last_name: 'Doe',
      last_online: new Date().toISOString(),
    },
    {
      user_id: UUIDs.users[1],
      first_name: 'Jane',
      last_name: 'Morrison',
      last_online: new Date().toISOString(),
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.seedDevelopmentData(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
