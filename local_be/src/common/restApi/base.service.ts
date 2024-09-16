import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export class BaseService<T, CreateDTO, UpdateDTO> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly model: Prisma.ModelName,
  ) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: object;
    where?: object;
    orderBy?: object;
  }) {
    const { skip, take, where, orderBy } = params;
    let totalCount: number | undefined;
    let totalPages: number | undefined;
    const data = await this.prisma[this.model].findMany({
        skip,
        take,
        where,
        orderBy,
      });
    if (skip !== undefined && take !== undefined) {
       totalCount = await this.prisma[this.model].count({ where });
       totalPages = Math.ceil(totalCount / take);
    }
    return {
        data,
        totalCount,
        totalPages,
    }
  }

  async findOne(where: object): Promise<T> {
    return await this.prisma[this.model].findUnique({ where });
  }

  async create(data: CreateDTO): Promise<T> {
    return await this.prisma[this.model].create({ data });
  }

  async update(params: {
    where: object;
    data: UpdateDTO;
  }): Promise<T> {
    const { where, data } = params;
    return await this.prisma[this.model].update({ where, data });
  }

  async delete(where: object): Promise<T> {
    return await this.prisma[this.model].delete({ where });
  }
}
