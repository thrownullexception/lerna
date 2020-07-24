import { Controller, Get, Query } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqTransformer } from './transformers';
import { APP_CONSTANTS } from '../shared/constants';
import { AccountModeType } from '../account-modes/account-modes.types';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('faqs'))
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  async index(@Query('account_mode') accountMode: AccountModeType): Promise<FaqTransformer[]> {
    const faqs = await this.faqsService.listFaqs(accountMode);
    return faqs.map(faq => new FaqTransformer(faq));
  }
}
