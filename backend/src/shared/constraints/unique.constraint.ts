import { getRepository, Not } from 'typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Serializable } from 'child_process';

@ValidatorConstraint({ async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
  async validate(field: string, args: ValidationArguments): Promise<boolean> {
    const [RepositoryModel] = args.constraints;
    let where = {
      [args.property]: args.value,
    };
    const skipId = args.object[`${args.property}Skip`];
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
  validationOptions?: ValidationOptions,
): (object: Serializable, propertyName: string) => void {
  return (object: Serializable, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [RepositoryModel],
      validator: UniqueConstraint,
    });
  };
}
