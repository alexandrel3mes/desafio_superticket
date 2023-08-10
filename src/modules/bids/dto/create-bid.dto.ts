import { IsInt, IsPositive } from 'class-validator';

export class CreateBidDto {
  @IsInt()
  @IsPositive()
  order_id: number;

  @IsInt()
  @IsPositive()
  value: number;
}
