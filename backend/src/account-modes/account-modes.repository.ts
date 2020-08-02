import { Repository, EntityRepository, FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AccountMode } from './account-modes.entity';
import { APP_CONSTANTS } from '../shared/constants';

@Injectable()
@EntityRepository(AccountMode)
export class AcccountModesRepository extends Repository<AccountMode> {
  private cachePrefix = '__AccountMode__';

  async listAccountModes(findManyOptions?: FindManyOptions<AccountMode>): Promise<AccountMode[]> {
    return await this.find({
      ...findManyOptions,
      cache: {
        id: `${this.cachePrefix}-list_${JSON.stringify(findManyOptions)}`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
    });
  }
}
