import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderCreateDto } from './dto/create.order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @ApiOperation({ summary: 'Create Order' })
  @ApiResponse({ status: 201, type: Order })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() orderDto: OrderCreateDto) {
    const newOrder = await this.orderService.createOrder(orderDto);
    return newOrder;
  }

  @ApiOperation({ summary: 'Get Order by Id' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get()
  getOrderById(@Param('orderId') orderId: number) {
    return this.orderService.getOrderById(orderId);
  }

  @ApiOperation({ summary: 'Update Order by Id' })
  @ApiResponse({ status: 200, type: [Order] })
  @Put()
  async UpdateOrder(
    @Param('orderId') orderId: number,
    @Body() updatedOrder: OrderCreateDto,
  ) {
    const order = await this.orderService.updateOrder(orderId, updatedOrder);
    return order;
  }

  @ApiOperation({ summary: `Delete Order by Id` })
  @ApiResponse({ status: 200 })
  @Delete()
  deleteOrder(@Param() id: number) {
    return this.orderService.deleteOrderById(id);
  }
}
