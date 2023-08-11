import { ApiProperty } from '@nestjs/swagger';
import { BidStatus } from 'src/entities/bid.entity';

export class BidResponse {
  @ApiProperty({
    example: 1,
    description: 'Id da oferta da ordem de serviço',
  })
  id: number;

  @ApiProperty({
    example: BidStatus.CREATED,
    enum: BidStatus,
    description: 'Status da oferta da ordem de serviço',
  })
  status: BidStatus;

  @ApiProperty({
    example: 10000,
    description: 'Valor da oferta da ordem de serviço (salvo em centavos)',
  })
  value: number;
}
