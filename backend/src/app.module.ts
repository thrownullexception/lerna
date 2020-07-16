import 'reflect-metadata';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { FaqsModule } from './faqs/faqs.module';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './shared/services';
import { ConfigModule } from './shared/services/config/config.module';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptors';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ValidationsModule } from './validations/validations.module';
import { HealthCheckModule } from './healthcheck/healthcheck.module';
import { GuestModule } from './guest/guest.module';
import { SkillHierarchiesModule } from './skill-hierarchies/skill-hierarchies.module';
import { SkillsModule } from './skills/skills.module';
import { TutorSkillLevelsModule } from './tutor-skill-levels/tutor-skill-levels.module';
import { TutorSkillsModule } from './tutor-skills/tutor-skills.module';
import { SessionsModule } from './sessions/sessions.module';
import { SessionSkillsModule } from './session-skills/session-skills.module';
import { SessionQuizzesModule } from './session-quizzes/session-quizzes.module';
import { SessionQuizResponsesModule } from './session-quiz-responses/session-quiz-responses.module';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigService,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    SessionModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): NestSessionOptions => config.getSessionOptions(),
    }),
    AuthModule,
    FaqsModule,
    ValidationsModule,
    HealthCheckModule,
    GuestModule,
    SkillHierarchiesModule,
    SkillsModule,
    TutorSkillLevelsModule,
    TutorSkillsModule,
    SessionsModule,
    SessionSkillsModule,
    SessionQuizzesModule,
    SessionQuizResponsesModule,
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
