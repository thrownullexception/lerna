import { Connection, FindOperator, FindOperatorType } from 'typeorm';

class FindOperatorWithExtras<T> extends FindOperator<T> {
  type: string;

  constructor(
    type: FindOperatorType | 'ilike',
    value: FindOperator<T> | T,
    useParameter?: boolean,
    multipleParameters?: boolean,
  ) {
    super(type as FindOperatorType, value, useParameter, multipleParameters);
    this.type = type;
  }

  public toSql(connection: Connection, aliasPath: string, parameters: string[]): string {
    if (this.type === 'ilike') {
      return `${aliasPath} ILIKE ${parameters[0]}`;
    }

    return super.toSql(connection, aliasPath, parameters);
  }
}

/**
 * Find Options Operator.
 * Example: { someField: Like("%some sting%") }
 */
export function ILike<T>(value: T | FindOperator<T>): FindOperatorWithExtras<T> {
  return new FindOperatorWithExtras('ilike', value);
}
