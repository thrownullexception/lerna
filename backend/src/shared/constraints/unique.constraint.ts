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

interface UniqueConstraintValidationOptions<T> extends ValidationOptions {
  columnName?: string;
}

interface UniqueConstraintValidationArguments<T> extends ValidationArguments {
  constraints: [IConstraintOptions<T>, string];
}

interface IConstraintOptions<T> {
  repositoryModel: new () => unknown;
  otherColumn?: keyof T;
  biDirectional?: boolean;
}

@ValidatorConstraint({ async: true })
class UniqueConstraint<T> implements ValidatorConstraintInterface {
  async validate(field: string, args: UniqueConstraintValidationArguments<T>): Promise<boolean> {
    const [constraintOptions, columnName] = args.constraints;
    const dbColumnName: string = columnName || args.property;

    let where = {
      [dbColumnName]: args.value,
    };

    if (constraintOptions.otherColumn) {
      where = {
        ...where,
        [constraintOptions.otherColumn]: get(args.object, [constraintOptions.otherColumn]),
      };
    }

    const skipId = get(args.object, [`${args.property}Skip`], get(args.object, ['id']));

    if (skipId) {
      where = { ...where, id: Not(skipId) };
    }

    if (constraintOptions.biDirectional) {
      // TODO
    }

    const data = await getRepository(constraintOptions.repositoryModel).findOne({
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

export function Unique<T>(
  constraintOptions: IConstraintOptions<T>,
  validationOptions?: UniqueConstraintValidationOptions<T>,
): (object: object, propertyName: string) => void {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [constraintOptions, validationOptions.columnName],
      validator: UniqueConstraint,
    });
  };
}
