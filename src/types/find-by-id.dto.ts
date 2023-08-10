import { IsNumberString } from 'class-validator';

export class FindByIdDto {
  @IsNumberString()
  id: number;
}
