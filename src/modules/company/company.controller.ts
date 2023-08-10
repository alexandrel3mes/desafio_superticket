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
