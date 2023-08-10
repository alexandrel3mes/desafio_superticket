import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { FindByIdDto } from 'src/types/find-by-id.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from '../auth/role/role.guard';
import { UserRole } from 'src/entities/user.entity';
import { Public } from 'src/decorators/public.decorator';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindByIdDto) {
    return this.activitiesService.findOne(+params.id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  update(
    @Param() params: FindByIdDto,
    @Body() updateActivityDto: CreateActivityDto,
  ) {
    return this.activitiesService.update(+params.id, updateActivityDto);
  }
}
