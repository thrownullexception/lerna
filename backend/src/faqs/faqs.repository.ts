import { Repository, EntityRepository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Faq } from './faqs.entity';
import { FaqDTO } from './faqs.dto';
import { Injectable } from '@nestjs/common';
import { APP_CONSTANTS } from 'src/shared/constants';

@Injectable()
@EntityRepository(Faq)
export class FaqsRepository extends Repository<Faq> {
  async listFaqs(): Promise<Faq[]> {
    return await this.find({
      order: { id: 'DESC' },
      cache: {
        id: 'FaqsRepository_listFaqs',
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
    });
  }

  async listFaqsAndCount(findAndCountOptions: FindManyOptions<Faq>): Promise<[Faq[], number]> {
    return await this.findAndCount(findAndCountOptions);
  }

  async showFaq(options: FindOneOptions<Faq>): Promise<Faq> {
    return await this.findOne({
      ...options,
      cache: {
        id: `FaqsRepository_showFaq_${JSON.stringify(options)}`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
    });
  }

  async createFaq(faqDTO: FaqDTO, lastTouchedById: string): Promise<void> {
    await this.insert({ ...faqDTO, lastTouchedById });
    this.manager.connection.queryResultCache?.clear();
  }

  async updateFaq(faqId: string, faqDTO: FaqDTO, lastTouchedById: string): Promise<void> {
    await this.update(faqId, { ...faqDTO, lastTouchedById });
    this.manager.connection.queryResultCache?.clear();
  }

  async deleteFaq(faqId: string): Promise<void> {
    await this.delete(faqId);
    this.manager.connection.queryResultCache?.clear();
  }
}
