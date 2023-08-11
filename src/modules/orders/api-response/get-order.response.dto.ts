import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/entities/order.entity';
import { BidResponse } from 'src/modules/bids/api-response/get-bid.response';

export class GetOrderReponse {
  @ApiProperty({
    example: 1,
    description: 'Id da ordem de serviço',
  })
  id: number;

  @ApiProperty({
    example: 'Motivos pessoais',
    description: 'Descrição da ordem de serviço',
  })
  description: number;

  @ApiProperty({
    example: OrderStatus.IN_PROGRESS,
    enum: OrderStatus,
    description: 'Status da ordem de serviço',
  })
  status: OrderStatus;

  @ApiProperty({
    example: 10000,
    description: 'Valor do pagamento da ordem de serviço (salvo em centavos)',
  })
  value: number;

  @ApiProperty({
    description: 'Advogado relacionado a essa ordem de serviço',
  })
  lawyer: any;

  @ApiProperty({
    description: 'Empresa relacionada a essa ordem de serviço',
  })
  company: any;

  @ApiProperty({
    type: BidResponse,
    isArray: true,
    description: 'Ofertas relacionadas a essa ordem de serviço',
  })
  bids: BidResponse;
}
