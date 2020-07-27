import { Injectable } from '@nestjs/common';
import { FindConditions, FindManyOptions } from 'typeorm';
import { Faq } from './faqs.entity';
import { FaqDTO } from './dtos';
import { FaqsRepository } from './faqs.repository';
import { IPaginatePayload, IQueryParametersDTO } from '../shared/types';
import { AccountModeType } from '../account-modes/account-modes.types';

@Injectable()
export class FaqsService {
  constructor(private readonly faqsRepository: FaqsRepository) {}

  async listFaqs(accountMode?: AccountModeType): Promise<Faq[]> {
    const filter: FindManyOptions<Faq> = { order: { id: 'DESC' } };
    if (accountMode) {
      filter.where = { accountModeSystemName: accountMode };
    }
    return await this.faqsRepository.listFaqs(filter);
  }

  async listFaqsByQueryParamters(
    queryParametersDTO: IQueryParametersDTO,
  ): Promise<IPaginatePayload<Faq>> {
    const where: FindConditions<Faq> = {};
    // if (filters) {
    //   const replied = get(filters, ['replied', 0]);
    //   if (replied) {
    //     where.replied = replied;
    //   }
    // }
    const [result, total] = await this.faqsRepository.listFaqsAndCount({
      ...where,
      ...queryParametersDTO,
    });
    const { take, page } = queryParametersDTO;
    return {
      data: result,
      count: total,
      take,
      page,
    };
  }

  async getFaqWithAllRelations(faqId: string): Promise<Faq> {
    return await this.faqsRepository.showFaq({
      where: { id: faqId },
      relations: ['lastTouchedBy', 'accountMode'],
    });
  }

  async createFaq(faqDTO: FaqDTO, lastTouchedById: string): Promise<void> {
    return await this.faqsRepository.createFaq({ ...faqDTO, lastTouchedById });
  }

  async updateFaq(faqId: string, faqDTO: FaqDTO, lastTouchedById: string): Promise<void> {
    await this.faqsRepository.updateFaq(faqId, { ...faqDTO, lastTouchedById });
  }

  async deleteFaq(faqId: string): Promise<void> {
    await this.faqsRepository.deleteFaq(faqId);
  }
}
