import {
  Controller,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from '../shared/decorators';
import { UserSettingDTO } from './user-settings.dto';
import { UserSettingsService } from './user-settings.service';

@Controller('user-settings')
@UseGuards(AuthGuard('jwt'))
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @AuthenticatedUser('id') userId: number,
    @Body() userSettingDTO: UserSettingDTO,
  ): Promise<void> {
    await this.userSettingsService.updateSetting(userSettingDTO, userId);
  }
}
