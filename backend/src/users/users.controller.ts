import {
  Controller,
  Body,
  UseGuards,
  UseInterceptors,
  Post,
  HttpCode,
  BadRequestException,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { ChangePasswordDTO, UpdateProfileDTO, UpdateBankDetailsDTO } from './dtos';
import { ProfilesService } from '../profiles/profiles.service';
import { BankDetailsService } from '../bank-details/bank-details.service';
import { FileStorageHelpers } from '../shared/helpers';
import { ConfigService, HashService } from '../shared/services';
import { AuthenticatedUser } from '../shared/decorators';
import { APP_CONSTANTS } from '../shared/constants';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('users'))
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly bankDetailsService: BankDetailsService,
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
  ) {}

  @Post('profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProfile(
    @AuthenticatedUser('id') id: string,
    @Body() updateProfileDTO: UpdateProfileDTO,
  ): Promise<void> {
    await this.profilesService.updateProfile(id, updateProfileDTO);
  }

  @Post('bankdetails')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateBankDetails(
    @AuthenticatedUser('id') userId: string,
    @Body() updateBankDetailsDTO: UpdateBankDetailsDTO,
  ): Promise<void> {
    await this.bankDetailsService.updateBankDetails(userId, updateBankDetailsDTO);
  }

  @Post('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @AuthenticatedUser('id') userId: string,
    @Body() changePasswordDTO: ChangePasswordDTO,
  ): Promise<void> {
    const oldPasswordHash = await this.usersService.getSingleFieldFromUserId(userId, 'password');
    if (!(await this.hashService.compare(changePasswordDTO.oldPassword, '' + oldPasswordHash))) {
      throw new BadRequestException('Invalid Password');
    }
    const newPassword = await this.hashService.make(changePasswordDTO.newPassword);
    await this.usersService.updateDetails(userId, { password: newPassword });
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: FileStorageHelpers(APP_CONSTANTS.AVATARS_PATH),
    }),
  )
  async updateProfileImage(
    @AuthenticatedUser('id') userId: string,
    @UploadedFile() file: { filename: string },
  ): Promise<{ image: string }> {
    // TODO remove the old user file
    const image = this.configService.getFileStorageHost(
      `${APP_CONSTANTS.AVATARS_PATH}/${file.filename}`,
    );
    this.profilesService.updateProfile(userId, { picture: image });
    return { image };
  }

  // @Get(':id')
  // async getDetails(
  //   @Param('id') userId: string,
  // ): Promise<UserDetailsTransformer> {
  //   const user = await this.usersService.getUserDetails(+userId);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return new UserDetailsTransformer(user);
  // }
}
