import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TariffController],
  providers: [TariffService, PrismaService],
  exports: [TariffService],
  imports: [AuthModule],
})
export class TariffModule { }
