import { PipeTransform, Injectable } from '@nestjs/common';
import { ICursorParametersDTO } from '../types';

@Injectable()
export class CursorQueryParametersPipe implements PipeTransform {
  transform(value: ICursorParametersDTO): ICursorParametersDTO {
    if (!value.limit) {
      value.limit = 10;
    }
    value.limit = +value.limit;

    return {
      ...value,
      afterCursor: value.afterCursor,
      beforeCursor: value.beforeCursor,
    };
  }
}
