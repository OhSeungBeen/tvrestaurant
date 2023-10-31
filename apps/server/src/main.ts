import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '@app/app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  const environment = configService.get<string>('app.environment');
  const logger = new Logger('NestApplication');

  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(cookieParser());

  await app.listen(port);

  logger.log(`Environment Variable ${environment}`);
  logger.log(`Application is running on ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
