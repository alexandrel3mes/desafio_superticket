import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { FindByIdDto } from 'src/types/find-by-id.dto';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  create(@Req() req: any, @Body() createBidDto: CreateBidDto) {
    return this.bidsService.create(createBidDto, req.user);
  }

  @Get()
  findAll() {
    return this.bidsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindByIdDto) {
    return this.bidsService.findOne(+params.id);
  }

  @Patch(':id')
  update(@Param() params: FindByIdDto, @Body() updateBidDto: UpdateBidDto) {
    return this.bidsService.update(+params.id, updateBidDto);
  }
}
