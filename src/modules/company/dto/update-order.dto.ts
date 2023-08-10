import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateOrderDto {
  description?: string;

  @IsInt()
  @IsOptional()
  @IsPositive()
  value?: number;
}
