import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { AdminUserTransformer } from './transformers';
import { AdminPermission } from '../shared/decorators';
import { PermissionsGuard } from '../auth/guards';
import { QueryParametersPipe } from '../shared/pipes';
import { IPaginatePayload, IQueryParametersDTO } from '../shared/types';
import { APP_CONSTANTS } from 'src/shared/constants';

const PERMISSION = 'CAN_MANAGE_USERS';

@Controller(APP_CONSTANTS.ADMIN_ROUTES_PREFIX('users'))
@UseGuards(AuthGuard('jwt'))
@AdminPermission(PERMISSION)
@UseGuards(PermissionsGuard)
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(
    @Query(new QueryParametersPipe()) queryParameters: IQueryParametersDTO,
  ): Promise<IPaginatePayload<AdminUserTransformer>> {
    const usersPaginated = await this.usersService.listUsersForAdmin(queryParameters);
    return {
      ...usersPaginated,
      data: usersPaginated.data.map(user => new AdminUserTransformer(user)),
    };
  }
}
