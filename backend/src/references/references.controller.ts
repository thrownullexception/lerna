import {
  Controller,
  Get,
  CacheInterceptor,
  UseInterceptors,
  Patch,
  UseGuards,
  HttpStatus,
  HttpCode,
  Body,
  Param,
} from '@nestjs/common';
import { ReferencesService } from './references.service';
import { AdminPermission } from '../shared/decorators';
import { PermissionsGuard } from '../auth/permissions.guards';
import { UpdateReferenceDTO } from './references.dto';
import { AuthGuard } from '@nestjs/passport';
import { CacheService } from '../shared/services';

@Controller('references')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(CacheInterceptor)
export class ReferencesController {
  constructor(
    private readonly referencesService: ReferencesService,
    private readonly cacheService: CacheService,
  ) {}

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
    this.cacheService.clearAllCacheMatching('references');
  }
}
