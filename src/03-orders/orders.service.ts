import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Order } from './model/order.model';
import { OrderCreateDto } from './dto/create.order.dto';
import { UsersService } from 'src/04-users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_REPOSITORY') private ordersRepository: typeof Order,
    private usersService: UsersService,
  ) {}

  async createOrder(orderDto: OrderCreateDto) {
    const newOrder = await this.ordersRepository.create(orderDto);
    if (!newOrder) {
      throw new HttpException(
        { message: 'something went wrong' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return newOrder;
  }

  async getOrderById(id: number) {
    const Order = await this.ordersRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!Order) {
      throw new HttpException(`Order ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return Order;
  }

  async findOrderByUserId(userId: number): Promise<Order[]> {
    const userExists = await this.usersService.getUserById(userId);
    if (!userExists) {
      throw new HttpException(
        `User with id ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const orders = await this.ordersRepository.findAll({ where: { userId } });
    return orders;
  }

  async findOrdersByBookTitle(bookTitle: string): Promise<Order[]> {
    try {
      const orders = await this.ordersRepository.findAll({
        where: { bookTitle },
      });
      return orders;
    } catch (error) {
      throw new HttpException(
        `Orders with book title '${bookTitle}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //TODO: переделать
  async findOrdersByDeliveryAddress(address: string): Promise<Order[]> {
    const orders = await this.ordersRepository.findAll({
      where: { deliveryAddress: address },
    });
    if (!orders || orders.length === 0) {
      throw new HttpException(
        `Orders with delivery address ${address} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return orders;
  }
  //Это для поиска одного заказа по адресу
  // const order = await Order.findByPk(orderId, { include: User });
  // const user = order.user;
  // const address = user.userAddress;

  async updateOrder(id: number, updatedto: OrderCreateDto): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!order) {
      throw new HttpException(`Order ${id} not found`, HttpStatus.NOT_FOUND);
    }

    order.bookTitle = updatedto.bookTitle;
    order.deliveryAddress = updatedto.deliveryAddress;
    order.deliveryDate = updatedto.deliveryDate;
    order.status = updatedto.status;

    try {
      await order.save();
      return order;
    } catch (error) {
      throw new HttpException(
        `Failed to update order ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOrderById(id: number) {
    const order = await this.ordersRepository.findByPk(id);
    if (!order) {
      throw new HttpException(`Order ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await order.destroy();
    return { message: `Order with ${id} deleted successfully` };
  }
}
