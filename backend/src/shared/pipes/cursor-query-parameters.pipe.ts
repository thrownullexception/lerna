import { PipeTransform, Injectable } from '@nestjs/common';
import { ICursorParametersDTO } from '../types';
import * as dateFormat from 'dateformat';

@Injectable()
export class CursorQueryParametersPipe implements PipeTransform {
  transform(value: ICursorParametersDTO): ICursorParametersDTO {
    if (!value.limit) {
      value.limit = 2;
    }

    value.limit = +value.limit;

    return {
      ...value,
      afterCursor: this.toDatabaseTimeFormat(value.afterCursor),
      beforeCursor: this.toDatabaseTimeFormat(value.beforeCursor),
    };
  }

  private toDatabaseTimeFormat(cursor: string): string {
    if (!cursor) {
      return cursor;
    }

    const decodedTime = decodeURIComponent(Buffer.from(cursor, 'base64').toString());

    const [column, ...rest] = decodedTime.split(':');

    return Buffer.from(
      column +
        ':' +
        encodeURIComponent(dateFormat(new Date(rest.join(':')), 'yyyy-mm-dd HH:MM:ss')),
    ).toString('base64');
  }
}
