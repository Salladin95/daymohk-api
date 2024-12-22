import { Module } from '@nestjs/common';

import { PrismaService } from '~/prisma';
import { AuthModule } from '~/modules/auth';

import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';

@Module({
  controllers: [TariffController],
  providers: [TariffService, PrismaService],
  exports: [TariffService],
  imports: [AuthModule],
})
export class TariffModule {}
