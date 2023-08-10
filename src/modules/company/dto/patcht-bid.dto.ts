import { BidStatus } from 'src/entities/bid.entity';

export class PatchBidDto {
  bid_id: number;
  action: BidStatus;
}
