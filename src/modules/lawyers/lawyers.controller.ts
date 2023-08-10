import {
  Body,
  Controller,
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

@Roles(UserRole.LAWYER)
@UseGuards(RoleGuard)
@Controller('lawyers')
export class LawyersController {
  constructor(
    private readonly lawyersService: LawyersService,
    private readonly bidsService: BidsService,
  ) {}

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
