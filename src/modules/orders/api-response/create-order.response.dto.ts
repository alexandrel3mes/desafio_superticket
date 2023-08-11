import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/entities/order.entity';

export class CreateOrderReponse {
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
}
