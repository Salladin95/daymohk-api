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
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatusEnum } from './order.contracts';
import { JwtAccessAuthGuard, RolesGuard } from '../../guards';
import { Role, Roles } from 'src/decorators';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(new CreateOrderDto(createOrderDto));
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(OrderStatusEnum.active)
  findAllActive() {
    return this.orderService.findAllActive();
  }

  @Get(OrderStatusEnum.archived)
  findAllArchived() {
    return this.orderService.findAllArchived();
  }

  @Get(OrderStatusEnum.canseled)
  findAllCanseled() {
    return this.orderService.findAllCanseled();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Put(':id/archive')
  archive(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.archive(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Put(':id/cansel')
  cansel(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.cansel(id);
  }

  @HttpCode(204)
  @Roles(Role.Admin)
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
