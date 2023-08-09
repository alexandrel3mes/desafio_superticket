import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
