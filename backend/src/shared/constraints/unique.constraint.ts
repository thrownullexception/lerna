/* eslint-disable @typescript-eslint/ban-types */
import { getRepository, Not } from 'typeorm';
import { get } from 'lodash';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

interface UniqueConstraintValidationOptions extends ValidationOptions {
  columnName?: string;
}

@ValidatorConstraint({ async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
  async validate(field: string, args: ValidationArguments): Promise<boolean> {
    const [RepositoryModel, columnName] = args.constraints;
    const dbColumnName: string = columnName || args.property;
    let where = {
      [dbColumnName]: args.value,
    };
    const skipId = args.object[`${args.property}Skip`] || get(args.object, ['id']);
    if (skipId) {
      where = { ...where, id: Not(skipId) };
    }
    const data = await getRepository(RepositoryModel).findOne({
      where,
      select: ['id'],
    });
    if (data) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property.toUpperCase()} already exists`;
  }
}

export function Unique(
  RepositoryModel: string,
  validationOptions?: UniqueConstraintValidationOptions,
): (object: object, propertyName: string) => void {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [RepositoryModel, validationOptions.columnName],
      validator: UniqueConstraint,
    });
  };
}
