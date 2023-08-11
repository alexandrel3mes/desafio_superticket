import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { OrdersService } from '../orders/orders.service';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { BidsService } from '../bids/bids.service';
import { PatchBidDto } from './dto/patcht-bid.dto';
import { BidStatus } from 'src/entities/bid.entity';
import { RoleGuard } from '../auth/role/role.guard';
import { UserRole } from 'src/entities/user.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { FindByIdDto } from 'src/types/find-by-id.dto';
import { OrderStatus } from 'src/entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetOrdersReponse } from '../orders/api-response/get-orders.response.dto';
import { CreateOrderReponse } from '../orders/api-response/create-order.response.dto';
import { EndOrderReponse } from '../orders/api-response/end-order.response.dto';
import { BidResponse } from '../bids/api-response/get-bid.response';

@ApiBearerAuth()
@ApiTags('Company - Empresa')
@Roles(UserRole.COMPANY)
@UseGuards(RoleGuard)
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly orderService: OrdersService,
    private readonly bidService: BidsService,
  ) {}

  @ApiOperation({
    summary:
      'Rota para listar todas ordens de serviço relacionadas ao seu usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Todas suas ordens de serviço',
    isArray: true,
    type: GetOrdersReponse,
  })
  @Get('order')
  list(@Req() req: any) {
    return this.orderService.findYours(req.user);
  }

  @ApiOperation({
    summary: 'Rota para criar ordem de serviço',
  })
  @ApiResponse({
    status: 201,
    description: 'Ordem criada',
    type: CreateOrderReponse,
  })
  @Post('order')
  createOrder(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto, req.user);
  }

  @ApiOperation({
    summary: 'Rota para editar ordem de serviço',
  })
  @ApiResponse({
    status: 200,
    description: 'Ordem editada',
    type: CreateOrderReponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Só é possível editar suas próprias ordens de serviço.',
  })
  @Patch('order/:id')
  async edit(
    @Param() params: FindByIdDto,
    @Req() req: any,
    @Body() dto: UpdateOrderDto,
  ) {
    await this.companyService.checkOrderBeforePatch(
      req.user,
      params.id,
      null,
      true,
    );
    return this.orderService.update(params.id, dto);
  }

  @ApiOperation({
    summary: 'Rota para finalizar ordem de serviço',
  })
  @ApiResponse({
    status: 200,
    description: 'Ordem finalizada',
    type: EndOrderReponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Só é possível finalizar ordens com status em progresso.',
  })
  @Patch('finish_order/:id')
  async finish(@Param() params: FindByIdDto, @Req() req: any) {
    await this.companyService.checkOrderBeforePatch(req.user, params.id, true);
    return this.orderService.update(params.id, {
      status: OrderStatus.FINISHED,
    });
  }

  @ApiOperation({
    summary: 'Rota para aceitar uma oferta',
  })
  @ApiResponse({
    status: 200,
    description: 'Oferta aceita',
    type: BidResponse,
  })
  @ApiResponse({
    status: 400,
    description:
      'Só é possível aceitar ou negar ofertas de suas próprias ordens de serviço.',
  })
  @Patch('bid/:id')
  async acceptOrDenyBid(
    @Param() params: FindByIdDto,
    @Req() req: any,
    @Body() dto: PatchBidDto,
  ) {
    if (dto.action === BidStatus.CREATED) {
      throw new HttpException(
        'Só é possível aceitar ou negar ofertas nessa rota',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.companyService.checkBidBeforePatch(req.user, params.id);

    if (dto.action === BidStatus.ACCEPTED) {
      await this.bidService.acceptedBid(params.id);
    }

    return this.bidService.update(params.id, { status: dto.action });
  }
}
