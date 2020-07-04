import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminCoinsHistoryTransformer } from './transformers';
import { PermissionsGuard } from '../auth/permissions.guards';
import { AdminPermission } from '../shared/decorators';
import { QueryParametersPipe } from '../shared/pipes';
import { CoinHistoryService } from './coin-histories.service';
import { IPaginatePayload, IQueryParametersDTO } from 'src/shared/types';

const PERMISSION = 'CAN_MANAGE_COINS_HISTORY';

@Controller('transations-histories/admin')
@UseGuards(AuthGuard('jwt'))
@AdminPermission(PERMISSION)
@UseGuards(PermissionsGuard)
export class AdminCoinsHistoryController {
  constructor(private readonly coinHistoryService: CoinHistoryService) {}

  @Get()
  async index(
    @Query(new QueryParametersPipe()) queryParameters: IQueryParametersDTO,
  ): Promise<IPaginatePayload<AdminCoinsHistoryTransformer>> {
    const dataPaginated = await this.coinHistoryService.listCoinsHistoriesForAdmin(queryParameters);
    return {
      ...dataPaginated,
      data: dataPaginated.data.map(datum => new AdminCoinsHistoryTransformer(datum)),
    };
  }
}
