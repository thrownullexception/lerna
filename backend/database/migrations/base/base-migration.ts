import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';
import { QueryRunner, TableForeignKey, TableIndex, Table, TableUnique } from 'typeorm';
import { camelCase } from 'lodash';

export enum ReferenceAction {
  Cascade = 'CASCADE',
  SetNull = 'SET NULL',
  NoAction = 'NO ACTION',
  Restrict = 'RESTRICT',
}

interface IReferenceParameters {
  table: string;
  referencedColumnHere: string;
  referenceAction: ReferenceAction;
  referencedColumnThere?: string;
}

export class BaseMigration {
  protected table: string;

  protected async reference(
    queryRunner: QueryRunner,
    {
      table,
      referencedColumnHere,
      referencedColumnThere = 'id',
      referenceAction = ReferenceAction.Cascade,
    }: IReferenceParameters,
  ): Promise<void> {
    await queryRunner.createForeignKey(
      camelCase(this.table),
      new TableForeignKey({
        name: `FK_${this.table}__${table}_${referencedColumnHere}`.toUpperCase(),
        columnNames: [camelCase(referencedColumnHere)],
        referencedColumnNames: [camelCase(referencedColumnThere)],
        referencedTableName: camelCase(table),
        onDelete: referenceAction,
        onUpdate: referenceAction,
      }),
    );
    await this.index(queryRunner, camelCase(referencedColumnHere));
  }

  protected async index(queryRunner: QueryRunner, column: string): Promise<void> {
    await queryRunner.createIndex(
      camelCase(this.table),
      new TableIndex({
        name: `INDEX_${this.table}-${column}`.toUpperCase(),
        columnNames: [camelCase(column)],
      }),
    );
  }

  protected async uniqueIndex(queryRunner: QueryRunner, columns: string[]): Promise<void> {
    const columnsLabel = columns.join('-');
    await queryRunner.createUniqueConstraint(
      camelCase(this.table),
      new TableUnique({
        name: `UNIQUE_${this.table}_${columnsLabel}`.toUpperCase(),
        columnNames: columns.map(camelCase),
      }),
    );
  }

  protected async createTable(
    queryRunner: QueryRunner,
    newFields: TableColumnOptions[],
  ): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: camelCase(this.table),
        columns: this.standardize(this.setSensibleDefault(newFields)),
      }),
    );
  }

  protected async drop(queryRunner: QueryRunner, table?: string): Promise<void> {
    if (!table) {
      table = this.table;
    }
    await queryRunner.dropTable(camelCase(table));
  }

  private setSensibleDefault(options: TableColumnOptions[]): TableColumnOptions[] {
    return options.map(option => {
      if (option.type === 'varchar' && !option.length) {
        option.length = '255';
      }
      return option;
    });
  }

  private standardize(newFields: TableColumnOptions[]): TableColumnOptions[] {
    const idField: TableColumnOptions[] = [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
      },
    ];

    const timestamps: TableColumnOptions[] = [
      {
        name: camelCase('created_at'),
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      },
      {
        name: camelCase('updated_at'),
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      },
    ];

    newFields = newFields.map(field => ({ ...field, name: camelCase(field.name) }));

    return [...idField, ...newFields, ...timestamps];
  }

  protected async createSystemTable(queryRunner: QueryRunner, tableName: string): Promise<void> {
    const currentTableName = this.table;
    this.table = tableName;
    await this.createTable(queryRunner, [
      {
        name: camelCase('system_name'),
        type: 'varchar',
      },
      {
        name: camelCase('display_name'),
        type: 'varchar',
      },
    ]);
    this.uniqueIndex(queryRunner, [camelCase('system_name')]);
    this.table = camelCase(currentTableName);
  }
}
