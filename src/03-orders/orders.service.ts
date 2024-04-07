import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Address, Order } from './order.model';
import { OrderCreateDto } from './dto/create.order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_REPOSITORY') private ordersRepository: typeof Order,
  ) {}

  async createOrder(dto: OrderCreateDto) {
    const newOrder = await this.ordersRepository.create(dto);
    if (!newOrder) {
      throw new HttpException(
        { message: 'Order not found' },
        HttpStatus.NOT_FOUND,
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

  async findByUserId(userId: number): Promise<Order[]> {
    const orders = await this.ordersRepository.findAll({ where: { userId } });
    return orders;
  }

  async findByBookTitle(bookTitle: string): Promise<Order[]> {
    const orders = await this.ordersRepository.findAll({
      where: { bookTitle },
    });
    return orders;
  }

  async findByDeliveryAddress(address: Address): Promise<Order[]> {
    const orders = await this.ordersRepository.findAll({
      where: { deliveryAddress: address },
    });
    return orders;
  }

  async updateOrder(id: number, updatedto: OrderCreateDto): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!order) {
      throw new HttpException(`Order ${id} not found`, HttpStatus.NOT_FOUND);
    }

    order.bookTitle = updatedto.bookTitle;
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
    return { message: `Order ${id} deleted successfully` };
  }
}
