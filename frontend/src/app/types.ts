export interface Cursor {
  beforeCursor?: string;
  afterCursor?: string;
}

export interface CursorData<Data> {
  data: Data[];
  cursor: Cursor;
}

export enum StatusThemes {
  Primary = 'primary',
  Success = 'success',
  Default = 'default',
}
