import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { UserEntity } from './user.entity';
import { BidEntity } from './bid.entity';

export enum OrderStatus {
  CREATED = 'created',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
}

@Entity({ name: 'orders' })
export class OrderEntity extends Base {
  @ManyToOne(() => UserEntity, (company) => company.companyOrders)
  @JoinColumn({ name: 'company_id' })
  company: UserEntity;

  @ManyToOne(() => UserEntity, (lawyer) => lawyer.lawyerOrders, {
    nullable: true,
  })
  @JoinColumn({ name: 'lawyer_id' })
  lawyer: UserEntity;

  @Column({ nullable: false })
  description: string;

  @Column({
    name: 'status',
    type: 'text',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus;

  @Column({ type: 'integer', nullable: true })
  value: number;

  @OneToMany(() => BidEntity, (bid) => bid.order)
  bids: BidEntity[];
}
