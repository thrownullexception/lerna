import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';
import { QueryRunner, TableForeignKey, TableIndex, Table } from 'typeorm';

export class BaseMigration {
  protected table: string;

  protected standardize(newFields: object[]): TableColumnOptions[] {
    const idField = [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
      },
    ];

    const timestamps = [
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      },
    ];

    return [...idField, ...newFields, ...timestamps] as TableColumnOptions[];
  }

  protected async reference(
    queryRunner: QueryRunner,
    table: string,
    referencedColumn: string,
    index = false,
  ) {
    await queryRunner.createForeignKey(
      this.table,
      new TableForeignKey({
        name: `FK_${this.table}__${table}_${referencedColumn}`.toUpperCase(),
        columnNames: [referencedColumn],
        referencedColumnNames: ['id'],
        referencedTableName: table,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    if (index) {
      await this.index(queryRunner, referencedColumn);
    }
  }

  protected async index(queryRunner: QueryRunner, column: string) {
    await queryRunner.createIndex(
      this.table,
      new TableIndex({
        name: `INDEX_${this.table}_${column}`.toUpperCase(),
        columnNames: [column],
      }),
    );
  }

  protected async createTable(
    queryRunner: QueryRunner,
    newFields: TableColumnOptions[],
  ) {
    await queryRunner.createTable(
      new Table({
        name: this.table,
        columns: this.standardize(newFields),
      }),
    );
  }

  protected async drop(queryRunner: QueryRunner) {
    await queryRunner.dropTable(this.table);
  }
}
