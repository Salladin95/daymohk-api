import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ManualConfigEnum } from './configs/manual.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = +configService.get(ManualConfigEnum.PORT);

  await app.listen(port);
  console.log(`server is listening on port: ${port}`);
}
bootstrap();
