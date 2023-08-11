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
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetOrdersReponse } from './api-response/get-orders.response.dto';
import { GetOrderReponse } from './api-response/get-order.response.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiExcludeEndpoint(true)
  @Roles(UserRole.COMPANY)
  @UseGuards(RoleGuard)
  create(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto, req.user);
  }

  @ApiTags('Orders - Ordem de serviço')
  @ApiOperation({
    summary: 'Rota para listar todas ordens de serviço',
  })
  @ApiResponse({
    status: 200,
    description: 'Todas ordens de serviço',
    isArray: true,
    type: GetOrdersReponse,
  })
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiTags('Orders - Ordem de serviço')
  @ApiOperation({
    summary: 'Rota para exibir detalhes da ordem de serviço',
  })
  @ApiResponse({
    status: 200,
    description: 'Ordem de serviço',
    type: GetOrderReponse,
  })
  @Get(':id')
  findOne(@Param() params: FindByIdDto) {
    return this.ordersService.findOne(+params.id);
  }

  @ApiExcludeEndpoint(true)
  @Patch(':id')
  @Roles(UserRole.COMPANY)
  @UseGuards(RoleGuard)
  update(@Param() params: FindByIdDto, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+params.id, updateOrderDto);
  }
}
