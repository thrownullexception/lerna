import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { Faq } from './faqs.entity';
import { FaqDTO } from './faqs.dto';
import { FaqsRepository } from './faqs.repository';
import { IPaginatePayload, IQueryParametersDTO } from 'src/shared/types';

@Injectable()
export class FaqsService {
  constructor(private readonly faqsRepository: FaqsRepository) {}

  async listFaqs(): Promise<Faq[]> {
    return await this.faqsRepository.listFaqs();
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

  async createFaq(faqDTO: FaqDTO, adminId: string): Promise<void> {
    return await this.faqsRepository.createFaq(faqDTO, adminId);
  }

  async updateFaq(faqId: string, faqDTO: FaqDTO, lastTouchedBy: string): Promise<void> {
    await this.faqsRepository.updateFaq(faqId, faqDTO, lastTouchedBy);
  }

  async deleteFaq(faqId: string): Promise<void> {
    await this.faqsRepository.deleteFaq(faqId);
  }
}
