import { QueryRunner } from 'typeorm';
import { camelCase } from 'lodash';

export enum StatusThemes {
  Primary = 'primary',
  Success = 'success',
  Default = 'default',
}

interface ISytemEnumerationFields {
  systemName: string;
  displayName: string;
  theme?: StatusThemes;
}

export class BaseSeed {
  protected table: string;
  protected systemEnumerationFields: ISytemEnumerationFields[];

  protected async seedSytemEnumerationTable(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      this.systemEnumerationFields.map(({ systemName, displayName, theme }) => {
        let field = '"systemName", "displayName"';
        let values = `'${systemName}','${displayName}'`;
        if (theme) {
          field += ', "theme"';
          values += `,'${theme}'`;
        }
        return queryRunner.query(
          `INSERT INTO "${camelCase(this.table)}" (${field}) VALUES (${values});`,
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
