import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataInterceptor } from './interceptor/data.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new DataInterceptor());
  await app.listen(3000);
}
bootstrap();
