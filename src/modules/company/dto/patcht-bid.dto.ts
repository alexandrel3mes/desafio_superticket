import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { BidStatus } from 'src/entities/bid.entity';

export class PatchBidDto {
  @ApiProperty({
    example: BidStatus.ACCEPTED,
    enum: BidStatus,
    description: 'Status da oferta da ordem de serviço',
  })
  @IsEnum(BidStatus)
  action: BidStatus;
}
