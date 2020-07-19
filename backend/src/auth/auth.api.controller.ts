import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthenticatedUser } from '../shared/decorators';
import { AuthenticatedUserDetailsTransformer } from './transformers/authenticated-user-details.transformers';
import { HashService, ConfigService } from '../shared/services';
import { UserVerificationService } from '../user-verifications/user-verifications.service';
import { StringHelpers, getFileAndStore } from '../shared/helpers';
import { ProfilesService } from '../profiles/profiles.service';
import { APP_CONSTANTS } from '../shared/constants';
import { IProviderAuthResponse } from './auth.types';
import {
  VerifyAccountDTO,
  SignUpDTO,
  ResendVerificationCodeDTO,
  CompleteProfileDTO,
  ResetPasswordDTO,
} from './dtos';
import { MailerService } from '@nest-modules/mailer';

interface IAuthenticationResponse extends Partial<AuthenticatedUserDetailsTransformer> {
  responseMeta?: 'RETURNING_USER' | 'ACCOUNT_VERIFICATION_FAILED' | 'NEW_AUTH_PROVIDER_USER';
}

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('auth'))
export class AuthApiController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
    private readonly profilesService: ProfilesService,
    private readonly mailerService: MailerService,
    private readonly userVerificationService: UserVerificationService,
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async signin(@AuthenticatedUser('id') userId: string): Promise<IAuthenticationResponse> {
    if (!(await this.usersService.getSingleFieldFromUserId(userId, 'verified'))) {
      return { responseMeta: 'ACCOUNT_VERIFICATION_FAILED' };
    }
    return await this.getAuthenticationResponse(userId);
  }

  @Post('signup')
  async signup(@Body() signUpDTO: SignUpDTO): Promise<{ userId: string }> {
    const passwordHash = await this.hashService.make(signUpDTO.password);

    const userId = await this.usersService.createNewUser({
      ...signUpDTO,
      password: passwordHash,
      verified: false,
    });

    this.userVerificationService.create(userId, signUpDTO.email, signUpDTO.username);

    return { userId };
  }

  @Post('facebook')
  @UseGuards(AuthGuard('facebook-token'))
  async authenticateFacebook(
    @AuthenticatedUser() user: IProviderAuthResponse,
  ): Promise<IAuthenticationResponse> {
    return await this.providerAuthentication(user);
  }

  @Post('google')
  @UseGuards(AuthGuard('google-token'))
  async authenticateGoogle(
    @AuthenticatedUser() user: IProviderAuthResponse,
  ): Promise<IAuthenticationResponse> {
    return await this.providerAuthentication(user);
  }

  @Post('verify-account')
  async verifyAccount(
    @Body() verifyAccountDTO: VerifyAccountDTO,
  ): Promise<IAuthenticationResponse> {
    const { code, email } = verifyAccountDTO;
    const user = await this.usersService.getUserDetailsFromEmail(email, ['id', 'verified']);
    if (!user) {
      throw new BadRequestException('Account verification failed');
    }
    const { id: userId, verified } = user;

    if (verified) {
      return await this.getAuthenticationResponse(userId);
    }

    if (!(await this.userVerificationService.verify(userId, code))) {
      throw new BadRequestException('Account Verification Failed');
    }

    await this.usersService.updateDetails(userId, { verified: true });

    return await this.getAuthenticationResponse(userId);
  }

  private async providerAuthentication({
    email,
    name,
    image,
  }: IProviderAuthResponse): Promise<IAuthenticationResponse> {
    const user = await this.usersService.getUserDetailsFromEmail(email, ['id']);
    if (user) {
      return {
        ...(await this.getAuthenticationResponse(user.id)),
        responseMeta: 'RETURNING_USER',
      };
    }

    let [username] = email.split('@');

    if (await this.usersService.hasValueBeenUsed('username', username)) {
      username += `_${StringHelpers.generateRandomNumbers(4)}`;
    }

    const userId = await this.usersService.createNewUser({
      email,
      username,
      verified: true,
    });

    this.updateProviderAuthenticationProfile(userId, { email, name, image });

    return {
      responseMeta: 'NEW_AUTH_PROVIDER_USER',
      id: userId,
      firstName: username,
    };
  }

  private async updateProviderAuthenticationProfile(
    userId: string,
    profile: IProviderAuthResponse,
  ): Promise<void> {
    const profileToUpdate = { firstName: '', picture: '' };

    if (profile.name) {
      profileToUpdate.firstName = profile.name;
    }

    if (profile.image) {
      const fileName = await getFileAndStore(profile.image, APP_CONSTANTS.AVATARS_PATH);
      profileToUpdate.picture = this.configService.getFileStorageHost(
        `${APP_CONSTANTS.AVATARS_PATH}/${fileName}`,
      );
    }

    if (profileToUpdate.firstName !== '' && profileToUpdate.picture !== '') {
      // TODO test this logic
      this.profilesService.updateProfile(userId, profileToUpdate);
    }
  }

  private async getAuthenticationResponse(
    userId: string,
  ): Promise<AuthenticatedUserDetailsTransformer> {
    const userBag = await this.usersService.getAuthenticatedUserBag(userId);
    const authToken = this.authService.generateAuthToken(userId);
    return new AuthenticatedUserDetailsTransformer(userBag, authToken);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO): Promise<void> {
    const { email } = resetPasswordDTO;
    const user = await this.usersService.getUserDetailsFromEmail(email, ['id']);
    if (!user) {
      return;
    }
    const { id: userId } = user;
    const newPassword = StringHelpers.generateRandomString(8);
    const newPasswordHash = await this.hashService.make(newPassword);
    await this.usersService.updateDetails(userId, {
      password: newPasswordHash,
    });

    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset',
      template: 'passwordReset.hbs',
      context: {
        newPassword,
      },
      from: 'no-reply@quinze.com',
    });
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resendVerificationCode(
    @Body() resendVerificationCodeDTO: ResendVerificationCodeDTO,
  ): Promise<void> {
    const { email } = resendVerificationCodeDTO;
    const { username, id: userId } = await this.usersService.getUserDetailsFromEmail(email, [
      'username',
      'id',
    ]);
    this.userVerificationService.create(userId, email, username);
  }

  @Post('complete-profile')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async completeProfile(
    @Body() completeProfileDTO: CompleteProfileDTO,
    @AuthenticatedUser('id') userId: string,
  ): Promise<void> {
    await this.profilesService.updateProfile(userId, completeProfileDTO);
  }

  @Post('referral')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async setReferral(): // @Body() setReferralDTO: SetReferralDTO,
  // @AuthenticatedUser('id') userId: string,
  Promise<void> {
    // const { username } = setReferralDTO;
    // const referredBy = await this.usersService.getUserIdFromMaybeUser({
    //   username,
    // });
    // if (!referredBy) {
    //   throw new BadRequestException('This username does not exist');
    // }
    // await this.usersService.updateDetails(userId, { referredBy: +referredBy });
    // const coins = await this.referencesService.getCoinsRewardForInvite();
    // await this.coinHistoryService.createReferralRewards(
    //   +referredBy,
    //   coins,
    //   '' + userId,
    // );
    // await this.usersService.incrementCoinsBy(+referredBy, coins);
  }
}
