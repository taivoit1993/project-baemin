import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StoreController],
  providers: [StoreService, PrismaService],
})
export class StoreModule {}
