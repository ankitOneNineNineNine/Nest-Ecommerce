import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/pipe/exceptions/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  const port = process.env.PORT || 8000;
  await app.listen(port);
  logger.log('Running at port ', port);
}
bootstrap();
