import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { jwtConfig, manualConfig, postgressConfig } from './configs';
import { DistrictModule } from './modules/district/district.module';
import { NewsModule } from './modules/news/news.module';
import { OrderModule } from './modules/order/order.module';
import { TariffModule } from './modules/tariff/tariff.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [manualConfig, jwtConfig, postgressConfig],
    }),
    NewsModule,
    TariffModule,
    DistrictModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
