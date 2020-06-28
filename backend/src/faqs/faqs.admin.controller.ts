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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FaqsService } from './faqs.service';
import { FaqDTO } from './faqs.dto';
import { AdminPermission } from '../shared/decorators';
import { PermissionsGuard } from '../auth/permissions.guards';
import { AuthenticatedUser } from '../shared/decorators';

const PERMISSION = 'CAN_MANAGE_FAQS';

@Controller('faqs/admin')
@UseGuards(AuthGuard('jwt'))
@AdminPermission(PERMISSION)
@UseGuards(PermissionsGuard)
export class AdminFaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Body() faqDTO: FaqDTO, @AuthenticatedUser('id') userId: string): Promise<void> {
    await this.faqsService.createFaq(faqDTO, userId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Body() faqDTO: FaqDTO,
    @Param('id') id: string,
    @AuthenticatedUser('id') userId: string,
  ): Promise<void> {
    await this.faqsService.updateFaq(id, faqDTO, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.faqsService.deleteFaq(id);
  }
}
