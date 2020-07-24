import { Get, Controller, Render } from '@nestjs/common';
import { APP_CONSTANTS } from '../shared/constants';

@Controller(APP_CONSTANTS.GUEST_ROUTES_PREFIX(''))
export class GuestController {
  @Get()
  @Render('guest/index')
  root(): Record<string, unknown> {
    return { message: 'Hello world!' };
  }
}
