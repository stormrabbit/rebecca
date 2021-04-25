import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { DataInterceptor } from './interceptor/data.interceptor';
import { AllExceptionFilter } from './filter/exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true }));
  app.use(logger); // 引入日志中间件
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new DataInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(3000);
}
bootstrap();
