import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { QueryParametersDTO } from '../dtos';

@Injectable()
export class QueryParametersPipe implements PipeTransform {
  transform(value: QueryParametersDTO, kiss: ArgumentMetadata): QueryParametersDTO {
    console.log(value);
    console.log(kiss);
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
