import { FindConditions, MoreThan, LessThan, Between } from 'typeorm';
import { get } from 'lodash';
import { ILike } from '../extensions/ilike.extension';
import { TimeHelpers } from '../helpers';

interface IFilterQueryStructure {
  type: ComparisionType;
  field: string;
}

export enum ComparisionType {
  TEXT_SEARCH,
  NUMERICAL_COMPARISION,
  EQUALITY_CHECK,
  DATE_SEARCH,
}

enum NumberComparisions {
  GREATER_THAN = 'g',
  LESS_THAN = 'l',
  EQUAL_TO = 'q',
}

export class QueryParamsToFindConditionHelper {
  static transform<T>(
    queryFilters: Record<string, unknown>,
    filterQueryStructure: IFilterQueryStructure[],
  ): FindConditions<T> {
    const findConditions: FindConditions<T> = {};
    if (!queryFilters) {
      return findConditions;
    }
    filterQueryStructure.reduce((allFindConditions, queryStructure) => {
      const findConditionField = queryStructure.field;
      switch (queryStructure.type) {
        case ComparisionType.NUMERICAL_COMPARISION:
          const valueBag = get(queryFilters, [queryStructure.field, 0]);
          if (valueBag) {
            let check = null;
            const value = valueBag.value;
            switch (valueBag.comparision) {
              case NumberComparisions.EQUAL_TO:
                check = value;
                break;
              case NumberComparisions.GREATER_THAN:
                check = MoreThan(value);
                break;
              case NumberComparisions.LESS_THAN:
                check = LessThan(value);
                break;
            }
            if (check) {
              allFindConditions[findConditionField] = check;
            }
          }
          break;
        case ComparisionType.TEXT_SEARCH:
          const valueBag$1 = get(queryFilters, [queryStructure.field, 0, 'value']);
          if (valueBag$1) {
            allFindConditions[findConditionField] = ILike(`%${valueBag$1}%`);
          }
          break;
        case ComparisionType.DATE_SEARCH:
          const valueBag$3 = get(queryFilters, [queryStructure.field, 0, 'value']);
          if (valueBag$3) {
            const dateSplit = valueBag$3.split(',');
            let dateTo: string;
            if (dateSplit.length === 1) {
              dateTo = TimeHelpers.getNextDate(valueBag$3);
            } else {
              dateTo = dateSplit[1];
            }
            allFindConditions[findConditionField] = Between(dateSplit[0], dateTo);
          }
          break;
        case ComparisionType.EQUALITY_CHECK:
          const valueBag$2 = get(queryFilters, [queryStructure.field, 0]);
          if (valueBag$2) {
            allFindConditions[findConditionField] = valueBag$2;
          }
          break;
      }
      return allFindConditions;
    }, findConditions);
    return findConditions;
  }
}
