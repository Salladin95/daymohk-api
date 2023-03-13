import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { jwtConfig, manualConfig, postgressConfig } from './configs';
import { NewsModule } from './modules/news/news.module';
import { TariffModule } from './modules/tariff/tariff.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [manualConfig, jwtConfig, postgressConfig],
    }),
    NewsModule,
    TariffModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
