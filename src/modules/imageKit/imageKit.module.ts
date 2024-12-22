import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaService } from '~/prisma';
import { ImageKitService } from './imageKit.service';

@Module({
  imports: [ConfigModule],
  providers: [ImageKitService, ConfigService, PrismaService],
  exports: [ImageKitService],
})
export class ImageKitModule {}
