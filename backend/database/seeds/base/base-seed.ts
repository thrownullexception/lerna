import { QueryRunner } from 'typeorm';
import { camelCase } from 'lodash';

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
          `INSERT INTO "${camelCase(
            this.table,
          )}" ("systemName", "displayName") VALUES ('${systemName}','${displayName}');`,
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
