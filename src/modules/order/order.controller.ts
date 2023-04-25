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
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatusEnum } from './order.contracts';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @UseInterceptors(ClassSerializerInterceptor)
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

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Put(':id/archive')
  archive(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.archive(id);
  }

  @Put(':id/cansel')
  cansel(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.cansel(id);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
