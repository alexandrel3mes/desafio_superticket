import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Descrição deve ter no mínimo 3 caracteres' })
  description: string;
}
