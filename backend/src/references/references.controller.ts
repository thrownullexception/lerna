import {
  Controller,
  Get,
  Patch,
  UseGuards,
  HttpStatus,
  HttpCode,
  Body,
  Param,
} from '@nestjs/common';
import { ReferencesService } from './references.service';
import { AdminPermission } from '../shared/decorators';
import { PermissionsGuard } from '../auth/guards';
import { UpdateReferenceDTO } from './references.dto';
import { AuthGuard } from '@nestjs/passport';
import { APP_CONSTANTS } from 'src/shared/constants';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('references'))
@UseGuards(AuthGuard('jwt'))
export class ReferencesController {
  constructor(private readonly referencesService: ReferencesService) {}

  @Get()
  async index(): Promise<Record<string, string | number>> {
    return {
      payoutThreshold: await this.referencesService.getPayoutThreshold(),
    };
  }

  @Patch(':id')
  @AdminPermission('CAN_UPDATE_REFERENCE') // This should not work
  @UseGuards(PermissionsGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') referenceId: string,
    @Body() updateReferenceDTO: UpdateReferenceDTO,
  ): Promise<void> {
    this.referencesService.updateReference(updateReferenceDTO, referenceId);
  }
}
