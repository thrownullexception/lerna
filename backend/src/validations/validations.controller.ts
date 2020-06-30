import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { APP_CONSTANTS } from 'src/shared/constants';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('validations'))
export class ValidationsController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async validateFields(
    @Body('entity') entity: string,
    @Body('field') field: string,
    @Body('value') value: string,
    @Body('skipId') skipId: string,
  ): Promise<boolean> {
    switch (entity) {
      case 'users':
        // Check that this makes sensee
        return await this.usersService.hasValueBeenUsed(field, value, +skipId);
      default:
        return false;
    }
  }
}
