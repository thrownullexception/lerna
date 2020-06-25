import { Injectable } from '@nestjs/common';
import { CacheOptionsFactory, CacheModuleOptions } from '@nestjs/common';
import { HandlebarsAdapter, MailerOptions } from '@nest-modules/mailer';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import * as winston from 'winston';
import * as appRoot from 'app-root-path';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

enum EnvironmentTypes {
  Production = 'production',
  Development = 'development',
  Staging = 'staging',
  Testing = 'testing',
}

@Injectable()
export class ConfigService implements CacheOptionsFactory {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const path = '.env';
    dotenv.config({ path });
    this.envConfig = process.env;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getFileStorageHost(path: string): string {
    // TODO: strip trailing slash
    return this.get('FILE_STORAGE_HOST') + '/' + path;
  }

  getCdnHost(path: string): string {
    return this.get('CDN_HOST') + '/' + path;
  }

  getRedisHost(): string {
    return this.get('REDIS_HOST');
  }

  getRedisPort(): number {
    return +this.get('REDIS_PORT');
  }

  getRedisPassword(): string {
    return this.get('REDIS_PASSWORD');
  }

  getRedisUrl(): string {
    return this.get('REDIS_URL');
  }

  getEnvironment(): EnvironmentTypes {
    return this.get('NODE_ENV') as EnvironmentTypes;
  }

  getSMTPHOST(): string {
    return this.get('MAIL_HOST');
  }

  getSMTPUsername(): string {
    return this.get('MAIL_USERNAME');
  }

  getSMTPPassword(): string {
    return this.get('MAIL_PASSWORD');
  }

  getMailFromAddress(): string {
    return this.get('MAIL_FROM_EMAIL');
  }

  getMailFromName(): string {
    return this.get('MAIL_FROM_NAME');
  }

  getJWTSecretKey(): string {
    return (
      this.get('JWT_SECRET_KEY') || 'a_quicj_brown_fox_lazied_over_the_jumped'
    );
  }

  getJWTTokenExpiration(): string {
    return this.get('JWT_TOKEN_EXPIRATION') || '365d';
  }

  getPort(): string {
    return this.get('PORT') || '4000';
  }

  getFacebookClientID(): string {
    return this.get('FACEBOOK_CLIENT_ID');
  }

  getFacebookClientSecret(): string {
    return this.get('FACEBOOK_CLIENT_SECRET');
  }

  getGoogleClientID(): string {
    return this.get('GOOGLE_CLIENT_ID');
  }

  getGoogleClientSecret(): string {
    return this.get('GOOGLE_CLIENT_SECRET');
  }

  getMailerOptions(): MailerOptions {
    return {
      transport: {
        host: this.getSMTPHOST(),
        port: 465,
        secure: true,
        auth: {
          user: this.getSMTPUsername(),
          pass: this.getSMTPPassword(),
        },
      },
      template: {
        dir: `${appRoot}/views/mails`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }

  createJwtOptions(): object {
    return {
      secret: this.getJWTSecretKey(),
      signOptions: {
        expiresIn: this.getJWTTokenExpiration(),
      },
    };
  }

  getWinstonOptions(): object {
    const options = {
      file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      },
      error: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      },
      console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
      },
    };

    return {
      exitOnError: false, // do not exit on handled exceptions
      transports: [
        new winston.transports.File(options.file),
        new winston.transports.File(options.error),
        new winston.transports.Console(options.console),
      ],
    };
  }

  getRedisConfig(): object {
    return {
      host: this.getRedisHost(),
      port: this.getRedisPort(),
      // password: this.getRedisPassword(),
    };
  }

  createCacheOptions(): CacheModuleOptions {
    return {
      ...this.getRedisConfig(),
      ttl: 60 * 60 * 24, // seconds => 1 day
      store: redisStore,
    };
  }

  getDBUsername(): string {
    return this.get('DB_USER');
  }

  getDBPassword(): string {
    return this.get('DB_PASSWORD');
  }

  getGlobalAPIPrefix(): string {
    return 'api';
  }

  getDBName(): string {
    let dbName = this.get('DB_NAME');
    if (this.getEnvironment() === EnvironmentTypes.Testing) {
      dbName = dbName + '_test';
    }
    return dbName;
  }

  getDBHost(): string {
    return this.get('DB_HOST');
  }

  getDBPort(): number {
    return +this.get('DB_PORT');
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    const ENTITIES_DIR =
      this.getEnvironment() === 'production' ? './dist' : './dist/src';
    return {
      keepConnectionAlive: true,
      type: 'postgres' as 'postgres',
      host: this.getDBHost(),
      port: this.getDBPort(),
      username: this.getDBUsername(),
      password: this.getDBPassword(),
      database: this.getDBName(),
      entities: [ENTITIES_DIR + '/**/**.entity{.ts,.js}'],
      logging: false, // !['production', 'test', 'testing'].includes(this.getEnvironment()),
      namingStrategy: new SnakeNamingStrategy(),
      retryAttempts: 5,
    };
  }
}
