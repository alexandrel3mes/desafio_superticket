import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateBidLawyer {
  @ApiProperty({
    example: 10000,
    description: 'Valor da oferta da ordem de serviço (salvo em centavos)',
  })
  @IsInt()
  @IsPositive()
  value: number;
}
