import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date | string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date | string;
}
