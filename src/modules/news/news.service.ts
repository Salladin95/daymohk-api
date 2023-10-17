import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import getNotFoundMsg from 'src/utils/getNotFoundMsg';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ImageKitService } from '../imageKit/imageKit.service';

@Injectable()
export class NewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageKit: ImageKitService,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    return this.prisma.news.create({ data: createNewsDto });
  }

  async findAll() {
    const news = await this.prisma.news.findMany({
      include: { backgroundImage: true },
    });
    return news;
  }

  async findOne(id: string) {
    const news = await this.prisma.news.findUnique({
      where: { id },
      include: { backgroundImage: true },
    });
    if (!news) {
      throw new NotFoundException(getNotFoundMsg('News'));
    }
    return news;
  }

  async update(id: string, dto: UpdateNewsDto) {
    await this.findOne(id);
    const updatedNews = await this.prisma.news.update({
      where: { id },
      data: dto,
    });
    return updatedNews;
  }

  async remove(id: string) {
    const news = await this.findOne(id);
    await this.imageKit.removeFile(news.backgroundImage.fileId);
    return this.prisma.news.delete({ where: { id } });
  }
}
