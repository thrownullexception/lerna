import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not, FindOperator, FindConditions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from './users.entity';
import { ICreateUserDetails } from './users.types';
import { QueryParametersDTO } from '../shared/dtos';
import { IPaginatePayload } from '../shared/types';
import {
  QueryParamsToFindConditionHelper,
  ComparisionType,
} from '../shared/helpers';

const take = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRespository: Repository<User>,
  ) {}

  async getMyReferrals(userId: number, page: number): Promise<User[]> {
    const skip = (page - 1) * take;
    return await this.usersRespository.find({
      take,
      skip,
      where: {
        referredBy: userId,
      },
      relations: ['profile'],
    });
  }

  // async incrementCoinsBy(userId: number, coins: number): Promise<void> {
  //   await this.usersRespository.increment({ id: userId }, 'coins', coins);
  // }

  async getUserDetails(userId: number): Promise<User> {
    return this.usersRespository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async hasValueBeenUsed(
    field: string,
    value: string,
    skipId?: number,
  ): Promise<boolean> {
    let where: { [x: string]: string | FindOperator<number> } = {
      [field]: value,
    };

    if (skipId) {
      where = { ...where, id: Not(skipId) };
    }

    const valuesCount = await this.usersRespository.count({
      where,
    });
    return valuesCount === 1;
  }
  // Advance todo try to use generics here
  async getUserDetailsFromEmail(
    email: string,
    select: Array<'id' | 'password' | 'username' | 'verified'>,
  ): Promise<User> {
    return this.usersRespository.findOne({
      select,
      where: {
        email,
      },
    });
  }

  async getUserIdFromMaybeUser(
    where: QueryDeepPartialEntity<User>,
  ): Promise<string | boolean> {
    const user = await this.usersRespository.findOne({
      select: ['id'],
      where,
    });
    if (!user) {
      return false;
    }
    return user.id;
  }

  async updateDetails(
    userId: string,
    details: QueryDeepPartialEntity<User>,
  ): Promise<void> {
    this.usersRespository.update({ id: userId }, details);
  }

  // TODO get this only after signin
  async getAuthenticatedUserBag(userId: string): Promise<User> {
    return this.usersRespository.findOne({
      where: {
        id: userId,
      },
      relations: [
        'profile',
        'bankDetail',
        'bankDetail.bank',
        'settings',
        'role',
        'role.permissions',
        'role.permissions.permission',
      ],
    });
  }

  async getUserWithPermission(id: string): Promise<User> {
    return await this.usersRespository.findOne({
      where: { id },
      relations: ['role', 'role.permissions', 'role.permissions.permission'],
    });
  }

  async getSingleFieldFromUserId<T extends keyof User>(
    userId: string,
    field: T,
  ): Promise<Pick<User, T>> {
    const user = await this.usersRespository.findOne({
      select: [field],
      where: {
        id: userId,
      },
    });
    if (!user) {
      return;
    }
    return (user[field] as unknown) as Pick<User, T>;
  }

  async getMultipleFieldsFromUserId(
    userId: string,
    select: Array<'id' | 'roleId'>,
  ): Promise<User> {
    return this.usersRespository.findOne({
      select,
      where: {
        id: userId,
      },
    });
  }

  async createNewUser(userDetails: ICreateUserDetails): Promise<string> {
    // TODO transactions
    const user = await this.usersRespository.save(userDetails);
    const userId = user.id;

    // await this.profilesService.createForNewUser(userId);
    // await this.bankDetailsService.createForNewUser(userId);

    // TODO create all the public notifications fir hte new user but mark them as unread
    return userId;
  }

  async getUsersWithProfileFromUserIds(userIds: number[]): Promise<User[]> {
    return this.usersRespository.find({
      where: { id: In(userIds) },
      relations: ['profile'],
    });
  }

  async listUsersForAdmin({
    take: take$1,
    page,
    sortBy,
    order,
    filters,
  }: QueryParametersDTO): Promise<IPaginatePayload<User>> {
    const skip = (page - 1) * take$1;
    const filterQueryStructure = [
      {
        field: 'verified',
        type: ComparisionType.EQUALITY_CHECK,
      },
      {
        field: 'username',
        type: ComparisionType.TEXT_SEARCH,
      },
      {
        field: 'email',
        type: ComparisionType.TEXT_SEARCH,
      },
    ];

    const where: FindConditions<User> = QueryParamsToFindConditionHelper.transform<
      User
    >(filters, filterQueryStructure);
    // console.log(where);
    const [result, total] = await this.usersRespository.findAndCount({
      where,
      take: take$1,
      relations: ['profile'],
      order: { [sortBy]: order },
      skip,
    });
    return {
      data: result,
      count: total,
      take: take$1,
      page,
    };
  }
}
