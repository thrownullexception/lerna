import {
  Controller,
  Get,
  CacheInterceptor,
  UseInterceptors,
  UseGuards,
  Param,
} from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsTransformer } from './faqs.transformers';
import { AuthGuard } from '@nestjs/passport';

@Controller('faqs')
// @UseGuards(AuthGuard('jwt'))
// @UseInterceptors(CacheInterceptor)
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  async index(): Promise<FaqsTransformer[]> {
    const faqs = await this.faqsService.listFaqs();
    return faqs.map(faq => new FaqsTransformer(faq));
  }

  @Get(':id')
  async show(@Param('id') faqId: string): Promise<FaqsTransformer> {
    const faq = await this.faqsService.getFaq(+faqId);
    return new FaqsTransformer(faq);
  }
}
