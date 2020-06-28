export class QueryParametersDTO {
  page = 1;
  take = 10;
  sortBy = 'id';
  order: 'DESC' | 'ASC' = 'DESC';
  filters?: Record<string, unknown>;
}
