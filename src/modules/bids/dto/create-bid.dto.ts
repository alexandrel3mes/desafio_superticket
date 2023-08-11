import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateBidDto {
  @ApiProperty({
    example: 1,
    description: 'Id da ordem de serviço alvo da oferta',
  })
  @IsInt()
  @IsPositive()
  order_id: number;

  @ApiProperty({
    example: 10000,
    description: 'Valor da oferta da ordem de serviço (salvo em centavos)',
  })
  @IsInt()
  @IsPositive()
  value: number;
}
