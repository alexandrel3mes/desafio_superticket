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
import { ApiTags } from '@nestjs/swagger';

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

  @Get('order')
  list() {
    return this.orderService.findAll();
  }

  @Get('order/:id')
  show(@Param() params: FindByIdDto) {
    return this.orderService.findOne(params.id);
  }

  @Post('order')
  createOrder(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto, req.user);
  }

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

  @Patch('finish_order/:id')
  async finish(@Param() params: FindByIdDto, @Req() req: any) {
    await this.companyService.checkOrderBeforePatch(req.user, params.id, true);
    return this.orderService.update(params.id, {
      status: OrderStatus.FINISHED,
    });
  }

  @Patch('bid/:id')
  async acceptOrDenyBid(
    @Param() params: FindByIdDto,
    @Req() req: any,
    @Body() dto: PatchBidDto,
  ) {
    await this.companyService.checkBidBeforePatch(req.user, params.id);

    if (dto.action === BidStatus.ACCEPTED) {
      await this.bidService.acceptedBid(params.id);
    }

    return this.bidService.update(params.id, { status: dto.action });
  }
}
