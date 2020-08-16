import { v4 } from 'uuid';
import { CursorData, Cursor } from './types';
import set from 'lodash/set';

export const addUUIDToForm = (form: object): object => ({ ...form, id: v4() });

export const mutateAUUIDIdOnMe = (form: object) => {
  return set(form, ['id'], v4());
};

export function transformCursorData<T>(
  cursorObject: CursorData<object>,
  transformer: any,
): CursorData<T> {
  return {
    data: cursorObject.data.map((datum: object) => new transformer(datum)),
    cursor: cursorObject.cursor,
  };
}

export function queryStringifyCursor(cursor: Cursor, filters: Record<string, string> = {}): string {
  let filters$1 = filters;
  if (cursor.afterCursor) {
    filters$1 = set(filters$1, 'afterCursor', cursor.afterCursor);
  }
  if (cursor.beforeCursor) {
    filters$1 = set(filters$1, 'beforeCursor', cursor.beforeCursor);
  }
  const querystring = Object.entries(filters$1)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  if (querystring === '') {
    return '';
  }
  return `?${querystring}`;
}
