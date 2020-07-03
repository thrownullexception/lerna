export class QueryParametersDTO {
  page: number;
  take: number;
  skip: number;
  sortBy: string;
  orderBy: 'DESC' | 'ASC';
  filters?: Record<string, unknown>;
  order: Record<string, 'DESC' | 'ASC'>;
}
