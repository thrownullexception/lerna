import { QueryRunner } from 'typeorm';

export class BaseSeed {
  protected table: string;
  protected data: Record<string, number | string | boolean>[];

  protected async seedDevelopmentData(queryRunner: QueryRunner, table$1?: string): Promise<void> {
    const table = table$1 ?? this.table;
    await Promise.all(
      this.data.map(dataToSeed => {
        const fields = Object.keys(dataToSeed)
          .map(value => '"' + value + '"')
          .join(',');
        const values = Object.values(dataToSeed)
          .map(value => `'${value}'`)
          .join(',');
        return queryRunner.query(`INSERT INTO ${table} (${fields}) VALUES (${values});`);
      }),
    );
  }
}
