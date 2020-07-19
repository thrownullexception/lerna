import { QueryRunner } from 'typeorm';

export class BaseSeed {
  protected table: string;
  protected data: Record<string, number | string | boolean>[];

  protected async seedDevevelopmentData(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      this.data.map(dataToSeed => {
        const fields = Object.keys(dataToSeed).join(',');
        const values = Object.values(dataToSeed).map(value => `'${value}'`).join(',');
        return queryRunner.query(
          `INSERT INTO ${this.table} (${fields}) VALUES (${values});`,
        );
      }),
    );
  }
}
