import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityEntity } from 'src/entities/activity.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>,
  ) {}
  create(createActivityDto: CreateActivityDto) {
    return this.activityRepository.save(createActivityDto);
  }

  findAll() {
    return this.activityRepository.find();
  }

  async findOne(id: number) {
    const activity = await this.activityRepository.findOneBy({ id });
    if (!activity) return false;
    return activity;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    await this.activityRepository.update(id, updateActivityDto);
    return this.findOne(id);
  }
}
