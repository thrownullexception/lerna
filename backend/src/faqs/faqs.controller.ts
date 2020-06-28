import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsTransformer } from './faqs.transformers';

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  async index(): Promise<FaqsTransformer[]> {
    const faqs = await this.faqsService.listFaqs();
    return faqs.map(faq => new FaqsTransformer(faq));
  }

  @Get(':faqId')
  async show(@Param('faqId', new ParseUUIDPipe()) faqId: string): Promise<FaqsTransformer> {
    const faq = await this.faqsService.getFaq(faqId);
    return new FaqsTransformer(faq);
  }
}
