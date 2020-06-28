import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'winston';
import * as μs from 'microseconds';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const before = μs.now();

    return next.handle().pipe(
      tap(() => {
        let since = μs.since(before);
        let unit = 'μ';
        if (since > 1000) {
          since /= 1000;
          unit = 'm';
        }
        this.logger.info(`${method} ${url} ${Math.round(since)}${unit}s`);
      }),
    );
  }
}
