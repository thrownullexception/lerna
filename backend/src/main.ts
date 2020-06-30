import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as helmet from 'helmet';
import nunjucks from 'nunjucks';
import { AppModule } from './app.module';
import { ConfigService } from './shared/services';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = new ConfigService();

  app.use(helmet());

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  nunjucks.configure('views', {
    express: app,
    autoescape: true,
  });

  app.setBaseViewsDir(join(__dirname, '..', '..', 'views'));
  app.setViewEngine('html');

  app.enable('trust proxy');

  await app.listen(configService.getPort());
}

bootstrap();
