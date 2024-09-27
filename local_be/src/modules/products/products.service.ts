import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseService } from 'src/common/restApi/base.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService extends BaseService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'Product');
  }
}
