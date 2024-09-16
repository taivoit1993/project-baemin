import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();

    this.$use(async (params, next) => {
      if (params.model === 'User' && params.action === 'create') {
        const user = params.args.data;
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }

      return next(params);
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
