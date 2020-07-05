import { PipeTransform, Injectable } from '@nestjs/common';
import { IQueryParametersDTO } from '../types';

@Injectable()
export class QueryParametersPipe implements PipeTransform {
  transform(value: IQueryParametersDTO): IQueryParametersDTO {
    if (!value.page) {
      value.page = 1;
    }
    value.page = +value.page;

    if (!value.take) {
      value.take = 10;
    }
    value.take = +value.take;

    if (!value.sortBy) {
      value.sortBy = 'createdAt';
    }

    if (value.orderBy !== 'ASC') {
      value.orderBy = 'DESC';
    }

    return {
      ...value,
      page: value.page,
      take: value.take,
      skip: (value.page - 1) * value.take,
      order: { [value.sortBy]: value.orderBy },
    };
  }
}
