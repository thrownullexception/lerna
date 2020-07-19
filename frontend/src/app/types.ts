export interface Cursor {
  beforeCursor?: string;
  afterCursor?: string;
}

export interface CursorData<Data> {
  data: Data[];
  cursor: Cursor;
}
