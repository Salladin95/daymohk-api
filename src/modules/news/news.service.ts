import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsEntity } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createNewsDto: CreateNewsDto) {
    return this.prisma.news.create({ data: createNewsDto });
  }

  async findAll() {
    const news = await this.prisma.news.findMany();
    return news.map(this.transform);
  }

  async findOne(id: string) {
    const news = await this.prisma.news.findUnique({ where: { id } });
    if (!news) {
      throw new NotFoundException();
    }
    return this.transform(news);
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    await this.findOne(id);
    const updatedNews = await this.prisma.news.update({
      where: { id },
      data: updateNewsDto,
    });
    return updatedNews;
  }

  async remove(id: string) {
    await this.findOne(id);
    const result = await this.prisma.news.delete({ where: { id } });
    return result;
  }

  transform(news: NewsEntity) {
    return new NewsEntity(news);
  }
}
