import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'winston';
import { ValidationError } from 'class-validator';
import { APP_CONSTANTS } from '../constants';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject('winston') private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message,
      validations: undefined,
    };

    this.logger.error(`${request.method} ${request.url} ${JSON.stringify(errorResponse)}`);

    if (request.url.startsWith(APP_CONSTANTS.ADMIN_ROUTES_PREFIX('', '/'))) {
      switch (status) {
        case HttpStatus.UNAUTHORIZED:
          const redirectUrl = APP_CONSTANTS.ADMIN_ROUTES_PREFIX('auth/signin', '/');
          // if(request.method === 'GET'){
          //   redirectUrl += `?redirect=${request.url}`;
          // }
          response.redirect(redirectUrl);
          return;
        case HttpStatus.FORBIDDEN:
          // Some logging is needed here
          response.redirect(APP_CONSTANTS.ADMIN_ROUTES_PREFIX('dashboard', '/'));

        case HttpStatus.BAD_REQUEST:
          // Some logging is needed here
          console.log(request.headers.referer);
          console.log(exception.getResponse());
        // response.redirect(APP_CONSTANTS.ADMIN_ROUTES_PREFIX('dashboard', '/'));
      }
    }

    console.log(exception);

    if (status === HttpStatus.BAD_REQUEST && typeof exception.message === 'object') {
      errorResponse.validations = this.transformClassValidatorsErrors(exception.message);
    }

    response.status(status).json(errorResponse);
  }

  private transformClassValidatorsErrors(errorBag: ValidationError[]): ValidationError[] {
    console.log(errorBag);
    return errorBag;
    // TODO
    // return errorBag.reduce((allStrings: [], error) => {
    //   const constraints = Object.values(error.constraints);
    //   return [...constraints, ...allStrings];
    // }, []);
  }
}
