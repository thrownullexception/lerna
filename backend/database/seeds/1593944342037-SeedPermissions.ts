import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPermissions1593944342037 implements MigrationInterface {
  private permissions = [
    'CAN_MANAGE_FAQS',
    'CAN_MANAGE_MESSAGES',
    'CAN_MANAGE_SKILLS',
    'CAN_MANAGE_PAYOUTS',
    'CAN_MANAGE_TRANSACTIONS',
    'CAN_MANAGE_SUPPORT',
    'CAN_MANAGE_REVIEWS',
    'CAN_MANAGE_DISPTUTES',
    'CAN_MANAGE_USERS',
  ];
  private table = 'permissions';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      this.permissions.map(permission => {
        return queryRunner.query(
          `INSERT INTO ${this.table} (permission) VALUES ('${permission}');`,
        );
      }),
    );
  }

  public async down(): Promise<void> {
    return;
  }
}
