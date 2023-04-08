import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import getNotFoundMsg from 'src/utils/getNotFoundMsg';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createDistrictDto: CreateDistrictDto) {
    return this.prisma.accessibleDistrict.create({ data: createDistrictDto });
  }

  async findAll() {
    return this.prisma.accessibleDistrict.findMany();
  }

  async findOne(id: string) {
    const district = await this.prisma.accessibleDistrict.findUnique({
      where: { id },
    });

    if (!district) {
      throw new NotFoundException(getNotFoundMsg('District'));
    }

    return district;
  }

  async update(id: string, updateDistrictDto: UpdateDistrictDto) {
    await this.findOne(id);
    const updatedDistrict = await this.prisma.accessibleDistrict.update({
      where: { id },
      data: updateDistrictDto,
    });

    return updatedDistrict;
  }

  async remove(id: string) {
    await this.findOne(id);
    const result = await this.prisma.accessibleDistrict.delete({
      where: { id },
    });
    return result;
  }
}
