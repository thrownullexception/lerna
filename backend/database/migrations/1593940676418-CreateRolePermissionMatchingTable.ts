import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateRolePermissionMatchingTable1593940676418 extends BaseMigration
  implements MigrationInterface {
  table = 'rolePermissionsMatching';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTable(queryRunner, [
      {
        name: 'role_id',
        type: 'uuid',
      },
      {
        name: 'permission_id',
        type: 'uuid',
      },
    ]);
    await this.reference(queryRunner, {
      table: 'roles',
      referencedColumnHere: 'role_id',
      referenceAction: ReferenceAction.Cascade,
    });
    await this.reference(queryRunner, {
      table: 'permissions',
      referencedColumnHere: 'permission_id',
      referenceAction: ReferenceAction.Cascade,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner);
  }
}
