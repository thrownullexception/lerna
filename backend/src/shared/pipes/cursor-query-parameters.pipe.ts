import { PipeTransform, Injectable } from '@nestjs/common';
import { ICursorParametersDTO } from '../types';
import * as dateFormat from 'dateformat';

@Injectable()
export class CursorQueryParametersPipe implements PipeTransform {
  // TODO Test me
  transform(value: ICursorParametersDTO): ICursorParametersDTO {
    if (!value.limit) {
      value.limit = 10;
    }

    value.limit = +value.limit;

    return {
      ...value,
      afterCursor: this.toDatabaseTimeFormat(value.afterCursor),
      beforeCursor: this.toDatabaseTimeFormat(value.beforeCursor, true),
    };
  }

  private toDatabaseTimeFormat(cursor: string, reduceTheTime?: boolean): string {
    if (!cursor) {
      return cursor;
    }

    const decodedTime = decodeURIComponent(Buffer.from(cursor, 'base64').toString());

    const [column, ...rest] = decodedTime.split(':');

    let timeStamp = new Date(rest.join(':'));

    if (reduceTheTime) {
      timeStamp = new Date(timeStamp.getTime() + 1000);
    }

    return Buffer.from(
      column + ':' + encodeURIComponent(dateFormat(timeStamp, 'yyyy-mm-dd HH:MM:ss')),
    ).toString('base64');
  }
}
