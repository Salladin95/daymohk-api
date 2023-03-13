import { Module } from '@nestjs/common';

import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [NewsController],
  providers: [NewsService, PrismaService],
})
export class NewsModule { }
