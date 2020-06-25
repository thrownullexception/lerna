export interface IPaginatePayload<T> {
  count: number;
  take: number;
  page: number;
  data: T[];
}
