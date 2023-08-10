import { IsEnum } from 'class-validator';
import { BidStatus } from 'src/entities/bid.entity';

export class PatchBidDto {
  @IsEnum(BidStatus)
  action: BidStatus;
}
