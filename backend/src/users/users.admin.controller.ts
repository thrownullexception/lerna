import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { AdminUserTransformer } from './transformers';
import { AdminPermission } from '../shared/decorators';
import { PermissionsGuard } from '../auth/permissions.guards';
import { QueryParametersPipe } from '../shared/pipes';
import { QueryParametersDTO } from '../shared/dtos';
import { IPaginatePayload } from '../shared/types';

const PERMISSION = 'CAN_MANAGE_USERS';

@Controller('users/admin')
@UseGuards(AuthGuard('jwt'))
@AdminPermission(PERMISSION)
@UseGuards(PermissionsGuard)
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(
    @Query(new QueryParametersPipe()) queryParameters: QueryParametersDTO,
  ): Promise<IPaginatePayload<AdminUserTransformer>> {
    const usersPaginated = await this.usersService.listUsersForAdmin(queryParameters);
    return {
      ...usersPaginated,
      data: usersPaginated.data.map(user => new AdminUserTransformer(user)),
    };
  }
}
