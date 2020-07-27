import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class CastBooleanParametersPipe<T> implements PipeTransform {
  private fields: Array<keyof T>;
  constructor(fields: Array<keyof T>) {
    this.fields = fields;
  }
  transform(value: Record<keyof T, unknown>): Record<keyof T, unknown> {
    this.fields.forEach(field => {
      value[field] = !!value[field];
    });
    return value;
  }
}
