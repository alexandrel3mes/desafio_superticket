import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from 'src/entities/order.entity';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  description?: string;

  @IsInt()
  @IsOptional()
  @IsPositive()
  value?: number;

  @IsString()
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
