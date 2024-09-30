import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { BaseService } from 'src/common/restApi/base.service';
import { Cart } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { groupBy, values } from 'lodash';

@Injectable()
export class CartService extends BaseService<
  Cart,
  CreateCartDto,
  UpdateCartDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'Cart');
  }

  async createCart(createCartDto: CreateCartDto) {
    const { userId, productId } = createCartDto;
    return this.prisma.cart.upsert({
      where: {
        userId_productId: {
          userId: +userId,
          productId: +productId,
        },
      },
      create: {
        userId: +userId,
        productId: +productId,
        quantity: 1,
      },
      update: {
        quantity: {
          increment: 1,
        },
      },
    });
  }

  async getAllCartByUser(userId: number) {
    const carts = await this.prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          include: {
            store: true,
          },
        },
      },
    });
    const product = carts.map((cart) => ({
      ...cart.product,
      quantity: cart.quantity,
    }));
    return values(
      groupBy(product, (item) => {
        return item.store.id.toString();
      }),
    );
  }
}
