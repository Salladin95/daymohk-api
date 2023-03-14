import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { ManualConfigEnum } from './configs/manual.config';
import { PrismaService } from './prisma/prisma.service';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const configService = app.get(ConfigService);
  const port = +configService.get(ManualConfigEnum.PORT);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(port);
  console.log(`server is listening on port: ${port}`);
}
bootstrap();
