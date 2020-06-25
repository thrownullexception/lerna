import { IFullTableDriver } from '../classes/antd-filtering-react-component';

export interface IQueryParameters {
  page: number;
  take: number;
  sortBy: string;
  order: 'DESC' | 'ASC';
  filters?: object;
}

export interface IPaginationRenderParameters {
  total: number;
  current: number;
  pageSize: number;
}

export class PaginationFilters {
  static mapToQueryParams(fullTableDriver: IFullTableDriver): IQueryParameters {
    const { pagination = { current: 1, pageSize: 10 }, filters, sorter } = fullTableDriver;
    const { current = 1, pageSize = 10 } = pagination;
    return {
      page: +current,
      take: +pageSize,
      sortBy: sorter ? sorter.field : 'id',
      order: sorter && sorter.order === 'ascend' ? 'ASC' : 'DESC',
      filters,
    };
  }
  static mapToRenderParams({ count = 0, page = 1, take = 10 }) {
    return {
      total: count,
      current: +page,
      pageSize: +take,
    };
  }
}
