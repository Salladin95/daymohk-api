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

  app.enableCors({
    origin: [configService.get(ManualConfigEnum.ORIGIN)],
    credentials: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
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
