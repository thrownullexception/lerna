import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';
import { CoinHistory } from './coin-histories.entity';
import { TransactionHistorySource, TransactionHistoryType } from './coin-histories.types';
import { QueryParametersDTO } from '../shared/dtos';
import { IPaginatePayload } from '../shared/types';
import { QueryParamsToFindConditionHelper, ComparisionType } from '../shared/helpers';

const take = 10;

@Injectable()
export class CoinHistoryService {
  constructor(
    @InjectRepository(CoinHistory)
    private readonly coinHistoryRepository: Repository<CoinHistory>,
  ) {}

  async createRewardsAds(userId: number, amount: number): Promise<void> {
    await this.coinHistoryRepository.insert({
      userId,
      message: 'Ads Watching Coins Reward',
      source: TransactionHistorySource.ADS_REWARD,
      sourceReference: '',
      amount,
      type: TransactionHistoryType.CREDIT,
    });
  }

  async createReferralRewards(
    userId: number,
    amount: number,
    sourceReference: string,
  ): Promise<void> {
    await this.coinHistoryRepository.insert({
      userId,
      message: 'Referral Coins Reward',
      source: TransactionHistorySource.REFERRAL,
      sourceReference,
      amount,
      type: TransactionHistoryType.CREDIT,
    });
  }

  async createSignupBonus(userId: number, amount: number): Promise<void> {
    await this.coinHistoryRepository.insert({
      userId,
      message: 'Signup Coins Bonus',
      source: TransactionHistorySource.SIGNUP_BONUS,
      amount,
      type: TransactionHistoryType.CREDIT,
    });
  }

  async createGameAttendanceDeduction(
    userIds: number[],
    amount: number,
    sourceReference: string,
  ): Promise<void> {
    const histories = userIds.map(userId => ({
      userId,
      message: 'Game Attendance Coins Deduction',
      source: TransactionHistorySource.GAME_ATTENDANCE_DEDUCTION,
      sourceReference,
      amount,
      type: TransactionHistoryType.DEBIT,
    }));

    await this.coinHistoryRepository
      .createQueryBuilder()
      .insert()
      .into(CoinHistory)
      .values(histories)
      .execute();
  }

  async createUsed(
    userId: number,
    amount: number,
    sessionId: number,
    questionNo: number,
  ): Promise<void> {
    await this.coinHistoryRepository.insert({
      userId,
      message: 'Used Coins During Game',
      source: TransactionHistorySource.USED,
      sourceReference: `${sessionId}_${questionNo}`,
      amount,
      type: TransactionHistoryType.DEBIT,
    });
  }

  async getNumberOfTimesCoinsUsed(userId: number): Promise<number> {
    return await this.coinHistoryRepository.count({
      userId,
      type: TransactionHistoryType.DEBIT,
    });
  }

  async listMyCoinsHistory(userId: number, page: number): Promise<CoinHistory[]> {
    const skip = (page - 1) * take;
    return this.coinHistoryRepository.find({
      where: { userId },
      skip,
      take,
      order: { id: 'DESC' },
    });
  }

  async listCoinsHistoriesForAdmin({
    take: take$1,
    page,
    sortBy,
    order,
    filters,
  }: QueryParametersDTO): Promise<IPaginatePayload<CoinHistory>> {
    const skip = (page - 1) * take$1;
    const filterQueryStructure = [
      {
        field: 'source',
        type: ComparisionType.EQUALITY_CHECK,
      },
      {
        field: 'amount',
        type: ComparisionType.NUMERICAL_COMPARISION,
      },
      {
        field: 'username',
        type: ComparisionType.EQUALITY_CHECK,
      },
      {
        field: 'type',
        type: ComparisionType.EQUALITY_CHECK,
      },
      {
        field: 'createdAt',
        type: ComparisionType.DATE_SEARCH,
      },
    ];

    const where: FindConditions<CoinHistory> = QueryParamsToFindConditionHelper.transform<
      CoinHistory
    >(filters, filterQueryStructure);

    const [result, total] = await this.coinHistoryRepository.findAndCount({
      where,
      take: take$1,
      relations: ['user'],
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
