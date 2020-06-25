import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { buildPaginator } from 'typeorm-cursor-pagination';
import { Faq } from './faqs.entity';
import { FaqDTO } from './faqs.dto';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
  ) {}

  async listFaqs(): Promise<Faq[]> {
    // const paginator = buildPaginator({
    //   entity: Faq,
    //   query: {
    //     limit: 5,
    //     afterCursor: 'aWQ6Mw=='
    //   },
    // });

    // const { data, cursor } = await paginator.paginate(this.faqRepository.createQueryBuilder('faq'));
    // console.log(cursor);
    // return data;
    return await this.faqRepository.find({ order: { id: 'DESC' } });
  }

  async getFaq(faqId: number): Promise<Faq> {
    return await this.faqRepository.findOne({
      where: { id: faqId },
      relations: ['admin'],
    });
  }

  async createFaq(faqDTO: FaqDTO, adminId: number): Promise<number> {
    const { id } = await this.faqRepository.save({ ...faqDTO, adminId });
    return id;
  }

  async updateFaq(
    faqId: number,
    faqDTO: FaqDTO,
    adminId: number,
  ): Promise<void> {
    await this.faqRepository.update(faqId, { ...faqDTO, adminId });
  }

  async deleteFaq(faqId: number): Promise<void> {
    await this.faqRepository.delete(faqId);
  }
}
