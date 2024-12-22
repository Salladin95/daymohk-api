import { json, urlencoded } from 'express';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ManualConfigEnum } from './configs/manual.config';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = +configService.get(ManualConfigEnum.PORT);
  const isProduction = process.env.NODE_ENV === 'production';

  app.enableCors({
    origin: isProduction
      ? [configService.get(ManualConfigEnum.ORIGIN)] // Разрешенный домен для продакшена
      : true, // Разрешить все запросы в режиме разработки
    credentials: true, // Если нужно передавать cookie или авторизационные заголовки
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Поддерживаемые методы
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ], // Допустимые заголовки
    exposedHeaders: ['Authorization', 'Content-Length'], // Заголовки, которые можно читать клиенту
    maxAge: 86400, // Кеширование preflight-запросов (в секундах)
  });

  app.use(json({ limit: '50mb' }));

  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(port);
  console.log(`server is listening on port: ${port}`);
}
bootstrap();
