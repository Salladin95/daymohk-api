import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import getNotFoundMsg from 'src/utils/getNotFoundMsg';
import { DistrictService } from '../district/district.service';
import { TariffService } from '../tariff/tariff.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tariffService: TariffService,
    private readonly districtService: DistrictService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    await this.tariffService.findOne(createOrderDto.tariffId);
    await this.districtService.findOne(createOrderDto.districtId);

    const createdOrder = await this.prismaService.order.create({
      data: createOrderDto,
    });
    return createdOrder;
  }

  async findAll() {
    return this.prismaService.order.findMany();
  }

  async findOne(id: string) {
    const order = await this.prismaService.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(getNotFoundMsg('Order'));
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);
    const updatedOrder = await this.prismaService.order.update({
      where: { id },
      data: updateOrderDto,
    });
    return updatedOrder;
  }

  async remove(id: string) {
    await this.findOne(id);
    const result = await this.prismaService.order.delete({ where: { id } });
    return result;
  }
}
