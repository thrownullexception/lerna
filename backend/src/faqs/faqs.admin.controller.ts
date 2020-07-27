import {
  Body,
  Post,
  Patch,
  Param,
  HttpStatus,
  HttpCode,
  Delete,
  Get,
  Render,
  Query,
  Res,
  Headers,
  ParseUUIDPipe,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { FaqsService } from './faqs.service';
import { FaqDTO } from './dtos';
import {
  AuthenticatedUser,
  SessionFlash,
  ISessionFlash,
  AdminController,
} from '../shared/decorators';
import { PaginationQueryParametersPipe } from '../shared/pipes';
import { IPaginatePayload, ISelectOptions, IQueryParametersDTO } from '../shared/types';
import { Faq } from './faqs.entity';
import { AccountModeAsOptions } from '../account-modes/account-modes.types';

const DOMAIN = 'faqs';

@AdminController(DOMAIN, 'CAN_MANAGE_FAQS')
export class AdminFaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  @Render(`admin/${DOMAIN}/list`)
  @UsePipes()
  async list(
    @Query(new PaginationQueryParametersPipe()) queryParametersDTO: IQueryParametersDTO,
  ): Promise<{ faqs: IPaginatePayload<Faq> }> {
    const faqs = await this.faqsService.listFaqsByQueryParamters(queryParametersDTO);
    return { faqs };
  }

  @Get('create')
  @Render(`admin/${DOMAIN}/create`)
  createPage(): { accountModeOptions: ISelectOptions[] } {
    return {
      accountModeOptions: AccountModeAsOptions,
    };
  }

  @Get(':faqId/edit')
  @Render(`admin/${DOMAIN}/edit`)
  async editPage(
    @Param('faqId', new ParseUUIDPipe()) faqId: string,
  ): Promise<Record<string, unknown>> {
    const faq = await this.faqsService.getFaqWithAllRelations(faqId);
    return { faq, accountModeOptions: AccountModeAsOptions };
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(
    @Body() faqDTO: FaqDTO,
    @AuthenticatedUser('id') userId: string,
    @Res() res: Response,
    @Headers('referer') back: string,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    // Try to make a validation error
    await this.faqsService.createFaq(faqDTO, userId);
    sessionFlash.success('Faq Created Successfully');
    res.redirect(back);
  }

  @Patch(':faqId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('faqId') faqId: string,
    @Body() faqDTO: FaqDTO,
    @Res() res: Response,
    @Headers('referer') back: string,
    @AuthenticatedUser('id') userId: string,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.faqsService.updateFaq(faqId, faqDTO, userId);
    sessionFlash.success('Faq Updated Successfully');
    res.redirect(back);
  }

  @Delete(':faqId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('faqId') faqId: string,
    @Headers('referer') back: string,
    @Res() res: Response,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.faqsService.deleteFaq(faqId);
    sessionFlash.success('Faq Deleted Successfully');
    res.redirect(back);
  }
}
