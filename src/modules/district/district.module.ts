import { Module } from '@nestjs/common';

import { PrismaService } from '~/prisma';
import { AuthModule } from '~/modules/auth';

import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';

@Module({
  controllers: [DistrictController],
  providers: [DistrictService, PrismaService],
  exports: [DistrictService],
  imports: [AuthModule],
})
export class DistrictModule {}
