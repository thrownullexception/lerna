import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqTransformer } from './faqs.transformer';
import { APP_CONSTANTS } from 'src/shared/constants';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('faqs'))
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  async index(): Promise<FaqTransformer[]> {
    const faqs = await this.faqsService.listFaqs();
    return faqs.map(faq => new FaqTransformer(faq));
  }

  @Get(':faqId')
  async show(@Param('faqId', new ParseUUIDPipe()) faqId: string): Promise<FaqTransformer> {
    const faq = await this.faqsService.getFaq(faqId);
    return new FaqTransformer(faq);
  }
}
