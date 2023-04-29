import { Module } from '@nestjs/common';

import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService, PrismaService],
  imports: [AuthModule],
})
export class NewsModule {}
