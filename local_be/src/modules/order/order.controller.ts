import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/modules/order/dto/create-order.dto';
import { Role } from 'src/decorators/role.decorator';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Role('user')
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    createOrderDto.userId = req.user.userId || null;
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @Role('user')
  getAll(@Request() req) {
    const userId = req.user.userId || null;
    return this.orderService.getOrderByUser(userId);
  }
}
