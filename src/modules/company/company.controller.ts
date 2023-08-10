import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { OrdersService } from '../orders/orders.service';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { BidsService } from '../bids/bids.service';
import { PatchBidDto } from './dto/patcht-bid.dto';
import { BidStatus } from 'src/entities/bid.entity';
import { RoleGuard } from '../auth/role/role.guard';
import { UserRole } from 'src/entities/user.entity';
import { Roles } from 'src/decorators/roles.decorator';

@Roles(UserRole.COMPANY)
@UseGuards(RoleGuard)
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly orderService: OrdersService,
    private readonly bidService: BidsService,
  ) {}

  @Post('order')
  createOrder(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto, req.user);
  }

  @Patch('bid')
  async acceptBid(@Req() req: any, @Body() dto: PatchBidDto) {
    if (dto.action === BidStatus.ACCEPTED) {
      await this.bidService.acceptedBid(dto.bid_id);
    }

    return this.bidService.update(dto.bid_id, { status: dto.action });
  }
}
