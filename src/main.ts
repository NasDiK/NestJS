import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { pgConfig } from './config';
import {buildExtensions} from './extensions';
import './envConfig';
import {TelegramWorker} from './services/telegram/models/TelegramWorker';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.setGlobalPrefix('api')

  await app.listen(3000);

  const ext = buildExtensions();
  const startLogger = ext.loggerBuilder('Start logger');

  if (process.env.env === 'dev') {
    startLogger.info(`PG config loaded. Config: ${JSON.stringify(pgConfig)}`)
  } else {
    startLogger.info(`PG config loaded. Config: hidden`)
  }

  // const telegramWorker = new TelegramWorker(ext);
}
bootstrap();
