import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import getNotFoundMsg from 'src/utils/getNotFoundMsg';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';

@Injectable()
export class TariffService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTariffDto: CreateTariffDto) {
    return this.prisma.tariff.create({ data: createTariffDto });
  }

  async findAll() {
    return this.prisma.tariff.findMany();
  }

  async findOne(id: string) {
    const tariff = await this.prisma.tariff.findUnique({ where: { id } });
    if (!tariff) {
      throw new NotFoundException(getNotFoundMsg('Tariff'));
    }
    return tariff;
  }
  async update(id: string, updateTariffDto: UpdateTariffDto) {
    await this.findOne(id);
    const updatedTariff = await this.prisma.tariff.update({
      where: { id },
      data: updateTariffDto,
    });
    return updatedTariff;
  }

  async remove(id: string) {
    await this.findOne(id);
    const result = await this.prisma.tariff.delete({ where: { id } });
    return result;
  }

  async findWiredAll() {
    return this.prisma.tariff.findMany({
      where: {
        type: 'wired',
      },
    });
  }

  async findWireLessAll() {
    return this.prisma.tariff.findMany({
      where: {
        type: 'wireLess',
      },
    });
  }

  async findOneWired(id: string) {
    const tariff = await this.prisma.tariff.findFirst({
      where: { type: 'wired', id },
    });
    if (!tariff) {
      throw new NotFoundException();
    }
    return tariff;
  }

  async findOneWireLess(id: string) {
    const tariff = await this.prisma.tariff.findFirst({
      where: { type: 'wireLess', id },
    });
    if (!tariff) {
      throw new NotFoundException();
    }
    return tariff;
  }
}
