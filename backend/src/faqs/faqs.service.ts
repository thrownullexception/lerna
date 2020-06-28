import { Injectable } from '@nestjs/common';
import { Faq } from './faqs.entity';
import { FaqDTO } from './faqs.dto';
import { FaqsRepository } from './faqs.repository';

@Injectable()
export class FaqsService {
  constructor(private readonly faqsRepository: FaqsRepository) {}

  async listFaqs(): Promise<Faq[]> {
    return await this.faqsRepository.listFaqs();
  }

  async getFaq(faqId: string): Promise<Faq> {
    return await this.faqsRepository.showFaq(faqId);
  }

  async createFaq(faqDTO: FaqDTO, adminId: string): Promise<string> {
    return await this.faqsRepository.createFaq(faqDTO, adminId);
  }

  async updateFaq(faqId: string, faqDTO: FaqDTO, lastTouchedBy: string): Promise<void> {
    await this.faqsRepository.updateFaq(faqId, faqDTO, lastTouchedBy);
  }

  async deleteFaq(faqId: string): Promise<void> {
    await this.faqsRepository.deleteFaq(faqId);
  }
}
