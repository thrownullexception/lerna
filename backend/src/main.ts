import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as helmet from 'helmet';
import * as nunjucks from 'nunjucks';
import * as methodOverride from 'method-override';
import { AppModule } from './app.module';
import { ConfigService } from './shared/services';
import { APP_CONSTANTS } from './shared/constants';
import * as cookieParser from 'cookie-parser';

const customizeNunjucks = (
  nunjucksInstance: nunjucks.Environment,
  configService: ConfigService,
) => {
  nunjucksInstance.addGlobal('__adminPrefix', APP_CONSTANTS.ADMIN_ROUTES_PREFIX(''));
  nunjucksInstance.addGlobal('__assetsLocation', configService.getAdminAssetsLocation());
  nunjucksInstance.addFilter('ceil', function(number: number) {
    return Math.ceil(number);
  });
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.use(helmet());
  app.use(methodOverride('_method'));

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const nunjucksInstance = nunjucks.configure('views', {
    express: app,
    autoescape: true,
    watch: configService.isDevelopment(),
  });

  customizeNunjucks(nunjucksInstance, configService);

  app.setBaseViewsDir(join(__dirname, '..', '..', 'views'));
  app.setViewEngine('html');

  app.use(cookieParser(configService.getSessionSecret()));

  app.enable('trust proxy');

  await app.listen(configService.getPort());
}

bootstrap();
