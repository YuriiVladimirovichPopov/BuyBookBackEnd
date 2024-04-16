import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './model/order.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderCreateDto } from './dto/create.order.dto';
import { PaginationDto } from 'src/pagination';

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

  @ApiOperation({ summary: 'Get All Orders' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get()
  getAllOrders(@Query() paginationDto: PaginationDto) {
    return this.orderService.getAllOrders(paginationDto);
  }

  @ApiOperation({ summary: 'Get Order by Id' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get(':id')
  getOrderById(@Param('id') orderId: number) {
    return this.orderService.getOrderById(orderId);
  }

  @ApiOperation({ summary: 'Update Order by Id' })
  @ApiResponse({ status: 200, type: [Order] })
  @Put(':id')
  async UpdateOrder(
    @Param('id') orderId: number,
    @Body() updatedOrder: OrderCreateDto,
  ) {
    const order = await this.orderService.updateOrder(orderId, updatedOrder);
    return order;
  }

  @ApiOperation({ summary: 'Get Order by user Id' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<Order[]> {
    return this.orderService.findOrderByUserId(userId);
  }

  @ApiOperation({ summary: 'Get Order by book title' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('/book/:bookTitle')
  async findByBookId(@Param('bookTitle') bookTitle: string): Promise<Order[]> {
    return this.orderService.findOrdersByBookTitle(bookTitle);
  }

  @ApiOperation({ summary: `Delete Order by Id` })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrderById(id);
  }
}
