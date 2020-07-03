/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Controller,
  UseGuards,
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
  Session,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FaqsService } from './faqs.service';
import { FaqDTO } from './faqs.dto';
import { PermissionsGuard } from '../auth/permissions.guards';
import {
  AuthenticatedUser,
  SessionFlash,
  AdminPermission,
  ISessionFlash,
} from '../shared/decorators';
import { APP_CONSTANTS } from 'src/shared/constants';
import { QueryParametersPipe } from 'src/shared/pipes';
import { QueryParametersDTO } from 'src/shared/dtos';
import { IPaginatePayload } from 'src/shared/types';
import { Faq } from './faqs.entity';
import { SessionFlashInterceptor } from 'src/shared/interceptors';

// const PERMISSION = 'CAN_MANAGE_FAQS';

@Controller(APP_CONSTANTS.ADMIN_ROUTES_PREFIX('faqs'))
// @UseGuards(AuthGuard('jwt'))
// @AdminPermission(PERMISSION)
// @UseGuards(PermissionsGuard)
@UseInterceptors(SessionFlashInterceptor)
export class AdminFaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  @Render('admin/faqs/list')
  async list(
    @Query(new QueryParametersPipe()) queryParametersDTO: QueryParametersDTO,
  ): Promise<{ faqs: IPaginatePayload<Faq> }> {
    console.log(queryParametersDTO);
    const faqs = await this.faqsService.listFaqsByQueryParamters(queryParametersDTO);
    return { faqs };
  }

  @Get('create')
  @Render('admin/faqs/create')
  createPage(): any {
    return {};
  }

  @Get(':faqId/edit')
  @Render('admin/faqs/edit')
  editPage(): any {
    return {};
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
    await this.faqsService.createFaq(faqDTO, '81c4c49a-a125-49b9-9ab5-4b1ee059bf49');
    sessionFlash.success('Faq Created Successfully');
    res.redirect(back);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() faqDTO: FaqDTO,
    @Res() res: Response,
    @Headers('referer') back: string,
    @AuthenticatedUser('id') userId: string,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.faqsService.updateFaq(id, faqDTO, '81c4c49a-a125-49b9-9ab5-4b1ee059bf49');
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
