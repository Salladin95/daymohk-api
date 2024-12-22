import { Module } from '@nestjs/common';

import { PrismaService } from '~/prisma';
import { AuthModule } from '~/modules/auth';
import { ImageKitModule } from '~/modules/imageKit';

import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  controllers: [NewsController],
  providers: [NewsService, PrismaService],
  imports: [AuthModule, ImageKitModule],
  exports: [NewsService],
})
export class NewsModule {}
