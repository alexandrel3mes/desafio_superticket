import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LawyersService } from './lawyers.service';
import { RoleGuard } from '../auth/role/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/entities/user.entity';
import { BidsService } from '../bids/bids.service';
import { CreateBidDto } from '../bids/dto/create-bid.dto';
import { FindByIdDto } from 'src/types/find-by-id.dto';
import { UpdateBidLawyer } from './dto/update-bid-lawyer.dto';
import { OrdersService } from '../orders/orders.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetOrdersReponse } from '../orders/api-response/get-orders.response.dto';
import { BidResponse } from '../bids/api-response/get-bid.response';

@ApiBearerAuth()
@ApiTags('Lawyer - Advogado')
@Controller('lawyers')
export class LawyersController {
  constructor(
    private readonly lawyersService: LawyersService,
    private readonly bidsService: BidsService,
    private readonly orderService: OrdersService,
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
  @Roles(UserRole.LAWYER)
  @UseGuards(RoleGuard)
  @Get('order')
  list(@Req() req: any) {
    return this.orderService.findYours(req.user);
  }

  @ApiOperation({
    summary: 'Rota para listar todas suas ofertas',
  })
  @ApiResponse({
    status: 200,
    description: 'Todas suas ofertas',
    isArray: true,
    type: BidResponse,
  })
  @Roles(UserRole.LAWYER)
  @UseGuards(RoleGuard)
  @Get('bid')
  listBids(@Req() req: any) {
    return this.bidsService.findYours(req.user);
  }

  @ApiOperation({
    summary: 'Rota para fazer um lance em uma ordem de serviço',
  })
  @ApiResponse({
    status: 201,
    description: 'Oferta criada',
    type: BidResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Apenas ordens iniciais podem receber uma oferta.',
  })
  @Roles(UserRole.LAWYER)
  @UseGuards(RoleGuard)
  @Post('bid')
  create(@Req() req: any, @Body() createBidDto: CreateBidDto) {
    return this.bidsService.create(createBidDto, req.user);
  }

  @ApiOperation({
    summary: 'Rota para editar o lance',
  })
  @ApiResponse({
    status: 200,
    description: 'Oferta editada',
    type: BidResponse,
  })
  @Roles(UserRole.LAWYER)
  @UseGuards(RoleGuard)
  @Patch('bid/:id')
  @ApiResponse({
    status: 400,
    description: 'Apenas ofertas iniciais podem ser editadas.',
  })
  async edit(@Param() params: FindByIdDto, @Body() dto: UpdateBidLawyer) {
    await this.lawyersService.checkBidBeforePatch(params.id);
    return this.bidsService.update(params.id, { value: dto.value });
  }
}
