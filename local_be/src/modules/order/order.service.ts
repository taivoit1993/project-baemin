import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '@prisma/client';
import { BaseService } from 'src/common/restApi/base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService extends BaseService<
  Order,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'Order');
  }
  async createOrder(createOrderDto: CreateOrderDto) {
    const cart = await this.prisma.cart.findMany({
      where: {
        userId: +createOrderDto.userId,
      },
      include: {
        product: true,
      },
    });
    if (!cart.length) {
      throw new Error('Cart is empty');
    }
    const order = await this.prisma.order.create({
      data: {
        userId: +createOrderDto.userId,
        total: cart.reduce((acc, cur) => {
          return acc + cur.product.price * cur.quantity;
        }, 0),

        OrderItem: {
          create: cart.map((cart) => ({
            productId: cart.productId,
            quantity: cart.quantity,
            price: cart.product.price,
            total: cart.product.price * cart.quantity,
          })),
        },
      },
    });

    await this.prisma.cart.deleteMany({
      where: {
        userId: +createOrderDto.userId,
      },
    });

    return order;
  }

  getOrderByUser(userId: number) {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        OrderItem: true,
      },
    });
  }
}
