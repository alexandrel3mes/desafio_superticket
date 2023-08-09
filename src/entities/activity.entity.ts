import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { Base } from './base.entity';

@Entity('activities')
export class ActivityEntity extends Base {
  @Column()
  name: string;

  @OneToMany(() => UserEntity, (company) => company.activity)
  companies: UserEntity[];
}
