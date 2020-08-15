import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration, ReferenceAction } from './base/base-migration';

export class CreateSessionCandidatesTable1594807279521 extends BaseMigration
  implements MigrationInterface {
  protected table = 'session_candidates';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createSystemTable(queryRunner, 'session_candidate_statuses');
    await this.createTable(queryRunner, [
      {
        name: 'session_id',
        type: 'uuid',
      },
      {
        name: 'candidate_id',
        type: 'uuid',
      },
      {
        name: 'status_system_name',
        type: 'varchar',
      },
      {
        name: 'reason',
        type: 'varchar',
      },
      {
        name: 'opened_at',
        type: 'timestamp',
        isNullable: true,
      },
      {
        name: 'responded_at',
        type: 'timestamp',
        isNullable: true,
      },
      {
        name: 'questioned_at',
        type: 'timestamp',
        isNullable: true,
      },
    ]);
    await this.reference(queryRunner, {
      table: 'users',
      referencedColumnHere: 'candidate_id',
      referenceAction: ReferenceAction.Restrict,
    });
    await this.reference(queryRunner, {
      table: 'sessions',
      referencedColumnHere: 'session_id',
      referenceAction: ReferenceAction.Cascade,
    });
    await this.reference(queryRunner, {
      table: 'session_candidate_statuses',
      referencedColumnHere: 'status_system_name',
      referencedColumnThere: 'system_name',
      referenceAction: ReferenceAction.Restrict,
    });
    await this.uniqueIndex(queryRunner, ['session_id', 'candidate_id']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.drop(queryRunner, 'session_candidates');
    await this.drop(queryRunner, 'session_candidate_statuses');
  }
}
