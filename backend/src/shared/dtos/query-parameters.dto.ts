export class QueryParametersDTO {
  page: number = 1;
  take: number = 10;
  sortBy: string = 'id';
  order: 'DESC' | 'ASC' = 'DESC';
  filters?: object;
}
