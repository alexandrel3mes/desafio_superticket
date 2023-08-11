import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { FindByIdDto } from 'src/types/find-by-id.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetOrdersReponse } from './api-response/get-orders.response.dto';
import { GetOrderReponse } from './api-response/get-order.response.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

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
}
