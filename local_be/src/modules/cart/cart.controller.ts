import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';

@ApiTags('Carts')
@ApiBearerAuth()
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @Role('user')
  create(@Request() req, @Body() createCartDto: CreateCartDto) {
    createCartDto.userId = req.user.userId || null;
    return this.cartService.createCart(createCartDto);
  }

  @Get()
  @Role('user')
  findAll(@Request() req) {
    return this.cartService.getAllCartByUser(req.user.userId);
  }
}
