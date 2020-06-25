import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from './shared/services';
import { NestExpressApplication } from '@nestjs/platform-express';

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

  app.enable('trust proxy');

  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(configService.getPort());
}

bootstrap();
