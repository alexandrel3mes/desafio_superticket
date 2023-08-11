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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lawyer - Advogado')
@Roles(UserRole.LAWYER)
@UseGuards(RoleGuard)
@Controller('lawyers')
export class LawyersController {
  constructor(
    private readonly lawyersService: LawyersService,
    private readonly bidsService: BidsService,
    private readonly orderService: OrdersService,
  ) {}

  @Get('order')
  list(@Req() req: any) {
    return this.orderService.findYours(req.user);
  }

  @Post('bid')
  create(@Req() req: any, @Body() createBidDto: CreateBidDto) {
    return this.bidsService.create(createBidDto, req.user);
  }

  @Patch('bid/:id')
  async edit(@Param() params: FindByIdDto, @Body() dto: UpdateBidLawyer) {
    await this.lawyersService.checkBidBeforePatch(params.id);
    return this.bidsService.update(params.id, { value: dto.value });
  }
}
