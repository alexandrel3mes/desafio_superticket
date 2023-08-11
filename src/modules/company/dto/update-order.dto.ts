import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @MinLength(3)
  description?: string;

  @IsInt()
  @IsOptional()
  @IsPositive()
  value?: number;
}
