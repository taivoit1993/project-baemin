import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productsService.update({ where: { id: +id }, data });
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'is_sale', required: false, type: Boolean })
  async findAll(
    @Query('search') search?: string,
    @Query('is_sale') is_sale?: boolean,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.productsService.findAll({
      skip: (+page || 1 - 1) * (+limit || 1),
      take: +limit || undefined,
      where: {
        specialPrice:
          is_sale?.toString() === 'true' ? { not: null } : undefined,
        name: { contains: search || undefined },
      },
    });
  }
}
