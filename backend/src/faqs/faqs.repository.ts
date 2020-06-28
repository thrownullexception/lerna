import { Repository, EntityRepository } from 'typeorm';
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

  async showFaq(faqId: string): Promise<Faq> {
    return await this.findOne({
      where: { id: faqId },
      relations: ['lastTouchedBy', 'accountMode'],
      cache: {
        id: `FaqsRepository_showFaq_${faqId}`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
    });
  }

  async createFaq(faqDTO: FaqDTO, adminId: string): Promise<string> {
    const { id } = await this.save({ ...faqDTO, adminId });
    this.queryRunner.connection.queryResultCache.clear();
    return id;
  }

  async updateFaq(faqId: string, faqDTO: FaqDTO, lastTouchedById: string): Promise<void> {
    await this.update(faqId, { ...faqDTO, lastTouchedById });
    this.queryRunner.connection.queryResultCache.clear();
  }

  async deleteFaq(faqId: string): Promise<void> {
    await this.delete(faqId);
    this.queryRunner.connection.queryResultCache.clear();
  }
}
