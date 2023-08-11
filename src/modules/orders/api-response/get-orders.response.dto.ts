import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/entities/order.entity';

export class GetOrdersReponse {
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
    example: OrderStatus.CREATED,
    enum: OrderStatus,
    description: 'Status da ordem de serviço',
  })
  status: OrderStatus;

  @ApiProperty({
    example: 10000,
    description: 'Valor do pagamento da ordem de serviço (salvo em centavos)',
  })
  value: number;
}
