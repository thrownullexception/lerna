import { PipeTransform, Injectable } from '@nestjs/common';
import { QueryParametersDTO } from '../dtos';

@Injectable()
export class QueryParametersPipe implements PipeTransform {
  transform(value: QueryParametersDTO): QueryParametersDTO {
    return { ...value, page: +value.page, take: +value.take };
  }
}
