import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { ManualConfigEnum } from './configs/manual.config';
import { PrismaService } from './prisma/prisma.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = +configService.get(ManualConfigEnum.PORT);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(port);
  console.log(`server is listening on port: ${port}`);
}
bootstrap();
