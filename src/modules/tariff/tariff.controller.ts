import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { JwtAccessAuthGuard, RolesGuard } from '../../guards';
import { Role, Roles } from 'src/decorators';

@Controller('tariff')
export class TariffController {
  constructor(private readonly tariffService: TariffService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @HttpCode(201)
  @Post()
  create(@Body() createTariffDto: CreateTariffDto) {
    return this.tariffService.create(createTariffDto);
  }

  @Get('wired')
  findWired() {
    return this.tariffService.findWiredAll();
  }

  @Get('archived')
  findAllArchived() {
    return this.tariffService.findAllArchived();
  }

  @Get('wireLess')
  findWireLess() {
    return this.tariffService.findWireLessAll();
  }

  @Get('wired/active')
  findWiredActive() {
    return this.tariffService.findWiredAllActive();
  }

  @Get('wired/archived')
  findWiredArchived() {
    return this.tariffService.findWiredAllArcived();
  }

  @Get('wireLess/active')
  findWireLessActive() {
    return this.tariffService.findWireLessAllActive();
  }

  @Get('wireLess/archived')
  findWireLessArchvied() {
    return this.tariffService.findWireLessAllArchived();
  }

  @Get('wired/:id')
  findWiredOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tariffService.findOneWired(id);
  }

  @Get('wireLess/:id')
  findWireLessOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tariffService.findOneWireLess(id);
  }

  @Get()
  findAll() {
    return this.tariffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tariffService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTariffDto: UpdateTariffDto,
  ) {
    return this.tariffService.update(id, updateTariffDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Put('archive/:id')
  archive(@Param('id', ParseUUIDPipe) id: string) {
    return this.tariffService.archive(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tariffService.remove(id);
  }
}
