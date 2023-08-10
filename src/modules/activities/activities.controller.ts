import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { FindByIdDto } from 'src/types/find-by-id.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from '../auth/role/role.guard';
import { UserRole } from 'src/entities/user.entity';

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
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindByIdDto) {
    return this.activitiesService.findOne(+params.id);
  }

  @Patch(':id')
  update(
    @Param() params: FindByIdDto,
    @Body() updateActivityDto: CreateActivityDto,
  ) {
    return this.activitiesService.update(+params.id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(+id);
  }
}
