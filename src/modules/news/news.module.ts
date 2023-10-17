import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { ImageKitModule } from '../imageKit/imageKit.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService, PrismaService],
  imports: [AuthModule, ImageKitModule],
  exports: [NewsService],
})
export class NewsModule {}
