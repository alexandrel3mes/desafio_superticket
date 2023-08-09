import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from '../company.entity/company.entity';

export class ActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CompanyEntity, (company) => company.activity)
  companies: CompanyEntity[];
}
