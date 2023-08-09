import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ActivityEntity } from '../activity.entity/activity.entity';

export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ActivityEntity, (activity) => activity.companies)
  activity: ActivityEntity;
}
