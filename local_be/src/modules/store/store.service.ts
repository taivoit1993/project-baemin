import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { BaseService } from 'src/common/restApi/base.service';
import { Store } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoreService extends BaseService<Store, CreateStoreDto, UpdateStoreDto> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'Store');
  }

  async findOneById(id: number) {
    return await this.prisma.store.findUnique({
      where: {
        id,
      },
      include: {
        Product: true,
      },
    });
  }
}
