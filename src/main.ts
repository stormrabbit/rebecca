import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { DataInterceptor } from './interceptor/data.interceptor';
import { AllExceptionFilter } from './filter/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true }));
  app.use(logger); // 引入日志中间件
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new DataInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors();
  const options = new DocumentBuilder()
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }) // 开启 bear 登陆
    .setTitle('Rebecca')
    .setDescription('瑞贝卡 api 文档')
    .setVersion('1.0')
    // .addTag('瑞贝卡')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(3000);
}
bootstrap();
