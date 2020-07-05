import { Controller, Post, UseGuards, Get, Render, Redirect, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from '../shared/decorators';
import { APP_CONSTANTS } from '../shared/constants';
import { AUTH_CONTANTS } from './auth.constants';
import { Response as ExpressResponse } from 'express';

const A_YEAR = 1000 * 60 * 60 * 24 * 365;

@Controller(APP_CONSTANTS.ADMIN_ROUTES_PREFIX('auth'))
export class AuthAdminController {
  @Post('signin')
  @UseGuards(AuthGuard('local'))
  @Redirect(APP_CONSTANTS.ADMIN_ROUTES_PREFIX('faqs', '/'))
  signin(@AuthenticatedUser('id') userId: string, @Response() res: ExpressResponse): void {
    res.cookie(AUTH_CONTANTS.AUTH_COOKIE_KEY, userId, {
      maxAge: A_YEAR,
      httpOnly: true,
      signed: true,
      sameSite: true,
    });
    // TODO if the user has no role, then do a security report
    return;
  }

  @Post('logout')
  @UseGuards(AuthGuard(AUTH_CONTANTS.COOKIE_STRATEGY))
  @Redirect(APP_CONSTANTS.ADMIN_ROUTES_PREFIX('auth/signin', '/'))
  logOut(@Response() res: ExpressResponse): void {
    res.clearCookie(AUTH_CONTANTS.AUTH_COOKIE_KEY);
    return;
  }

  @Get('signin')
  @Render('admin/auth/signin')
  getSigninPage(): void {
    return;
  }
}
