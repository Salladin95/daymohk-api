import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';

@Controller('tariff')
export class TariffController {
  constructor(private readonly tariffService: TariffService) { }

  @UsePipes(ValidationPipe)
  @HttpCode(201)
  @Post()
  create(@Body() createTariffDto: CreateTariffDto) {
    return this.tariffService.create(createTariffDto);
  }

  @Get()
  findAll() {
    return this.tariffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tariffService.findOne(id);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTariffDto: UpdateTariffDto,
  ) {
    return this.tariffService.update(id, updateTariffDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tariffService.remove(id);
  }
}
