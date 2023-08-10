import { IsInt, IsPositive } from 'class-validator';

export class UpdateBidLawyer {
  @IsInt()
  @IsPositive()
  value: number;
}
