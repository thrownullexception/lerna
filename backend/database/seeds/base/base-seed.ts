import { QueryRunner } from 'typeorm';

interface ISytemEnumerationFields {
  systemName: string;
  displayName: string;
}

export class BaseSeed {
  protected table: string;
  protected systemEnumerationFields: ISytemEnumerationFields[];

  protected async seedSytemEnumerationTable(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      this.systemEnumerationFields.map(({ systemName, displayName }) => {
        return queryRunner.query(
          `INSERT INTO ${this.table} (system_name, display_name) VALUES ('${systemName}','${displayName}');`,
        );
      }),
    );
  }

  protected async deSeedSytemEnumerationTable(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      this.systemEnumerationFields.map(({ systemName }) => {
        return queryRunner.query(`DELETE FROM ${this.table} WHERE system_name = '${systemName}';`);
      }),
    );
  }
}
