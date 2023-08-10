import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/entities/user.entity';
import { RoleGuard } from '../auth/role/role.guard';
import { FindByIdDto } from 'src/types/find-by-id.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles(UserRole.COMPANY)
  @UseGuards(RoleGuard)
  create(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto, req.user);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindByIdDto) {
    return this.ordersService.findOne(+params.id);
  }

  @Patch(':id')
  @Roles(UserRole.COMPANY)
  @UseGuards(RoleGuard)
  update(@Param() params: FindByIdDto, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+params.id, updateOrderDto);
  }
}
