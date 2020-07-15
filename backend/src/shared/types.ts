export interface IPaginatePayload<T> {
  count: number;
  take: number;
  page: number;
  data: T[];
}

export interface ISelectOptions {
  label: string;
  value: string;
}

export interface IQueryParametersDTO {
  page: number;
  take: number;
  skip: number;
  sortBy: string;
  orderBy: 'DESC' | 'ASC';
  filters?: Record<string, unknown>;
  order: Record<string, 'DESC' | 'ASC'>;
}

export interface ICursorParametersDTO {
  afterCursor: string;
  beforeCursor: string;
  limit: number;
}
