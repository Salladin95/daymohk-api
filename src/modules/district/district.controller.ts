import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { Role, Roles } from 'src/decorators';
import { JwtAccessAuthGuard } from '../auth/guards';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) { }

  @UseGuards(JwtAccessAuthGuard)
  @Roles(Role.Admin)
  @HttpCode(201)
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.districtService.findOne(id);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Roles(Role.Admin)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.update(id, updateDistrictDto);
  }

  @HttpCode(204)
  @UseGuards(JwtAccessAuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(id);
  }
}
