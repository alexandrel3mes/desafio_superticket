import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';

export enum BidStatus {
  CREATED = 'created',
  ACCEPTED = 'accepted',
  DENIED = 'denied',
}

@Entity({ name: 'bid' })
export class BidEntity extends Base {
  @ManyToOne(() => OrderEntity, (order) => order.bids)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => UserEntity, (lawyer) => lawyer.bids)
  @JoinColumn({ name: 'lawyer_id' })
  lawyer: UserEntity;

  @Column({ type: 'integer', nullable: false })
  value: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: BidStatus,
    default: BidStatus.CREATED,
  })
  status: BidStatus;
}
