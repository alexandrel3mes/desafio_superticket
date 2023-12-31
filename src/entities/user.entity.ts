import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { ActivityEntity } from './activity.entity';
import { OrderEntity } from './order.entity';
import { BidEntity } from './bid.entity';

export enum UserRole {
  COMPANY = 'company',
  LAWYER = 'lawyer',
  ADMIN = 'admin',
}

@Entity({ name: 'users' })
export class UserEntity extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    name: 'role',
    type: 'text',
    enum: UserRole,
    default: UserRole.COMPANY,
  })
  role: UserRole;

  @Column({ nullable: false, select: false })
  document: string;

  @ManyToOne(() => ActivityEntity, (activity) => activity.companies, {
    nullable: true,
  })
  @JoinColumn({ name: 'activity_id' })
  activity: ActivityEntity;

  @OneToMany(() => OrderEntity, (order) => order.company)
  companyOrders: OrderEntity[];

  @OneToMany(() => OrderEntity, (order) => order.company)
  lawyerOrders: OrderEntity[];

  @OneToMany(() => BidEntity, (bid) => bid.lawyer)
  bids: BidEntity[];
}
