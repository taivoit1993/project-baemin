import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { BaseService } from 'src/common/restApi/base.service';

export class BaseController<T, CreateDTO, UpdateDTO> {
  constructor(private readonly service: BaseService<T, CreateDTO, UpdateDTO>) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return await this.service.findAll({ skip: (+page || 1 - 1) * (+limit || 1), take: +limit || undefined });
  }


 

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne({ id: +id });
  }

  @Post()
  async create(@Body() data: CreateDTO) {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateDTO) {
    return await this.service.update({ where: { id: +id }, data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete({ id: +id });
  }
}
