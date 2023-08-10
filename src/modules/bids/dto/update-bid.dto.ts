import { PartialType } from '@nestjs/mapped-types';
import { CreateBidDto } from './create-bid.dto';
import { BidStatus } from 'src/entities/bid.entity';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateBidDto extends PartialType(CreateBidDto) {
  @IsOptional()
  @IsEnum(BidStatus)
  status: BidStatus;
}
