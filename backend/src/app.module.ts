import 'reflect-metadata';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { FaqsModule } from './faqs/faqs.module';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './shared/services';
import { ConfigModule } from './shared/services/config/config.module';
import { CacheModule } from './shared/services/cache/cache.module';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptors';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ValidationsModule } from './validations/validations.module';
import { HealthCheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigService, // TODO check this works
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    CacheModule,
    AuthModule,
    FaqsModule,
    ValidationsModule,
    HealthCheckModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
