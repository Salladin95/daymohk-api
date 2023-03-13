import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { jwtConfig, manualConfig, postgressConfig } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [manualConfig, jwtConfig, postgressConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
