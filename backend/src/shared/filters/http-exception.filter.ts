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

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject('winston') private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
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

    this.logger.error(
      `${request.method} ${request.url} ${JSON.stringify(errorResponse)}`,
    );

    if (
      status === HttpStatus.BAD_REQUEST &&
      typeof exception.message === 'object'
    ) {
      errorResponse.validations = this.transformClassValidatorsErrors(
        exception.message,
      );
    }

    response.status(status).json(errorResponse);
  }

  private transformClassValidatorsErrors(errorBag: ValidationError[]) {
    return errorBag;
    // TODO
    // return errorBag.reduce((allStrings: [], error) => {
    //   const constraints = Object.values(error.constraints);
    //   return [...constraints, ...allStrings];
    // }, []);
  }
}
