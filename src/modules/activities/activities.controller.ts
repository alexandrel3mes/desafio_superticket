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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ActivityResponse } from './api-response/activity.response';

@ApiTags('Activity - Ramo de atividades')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Rota para criar um ramo de atividades - Exclusivo admin',
  })
  @ApiResponse({
    status: 201,
    description: 'Ramo de atividade criado',
    type: ActivityResponse,
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Rota para listar todos ramos de atividades',
  })
  @ApiResponse({
    status: 200,
    description: 'Ramos de atividade',
    isArray: true,
    type: ActivityResponse,
  })
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({
    summary: 'Rota para exibir um ramo de atividades',
  })
  @ApiResponse({
    status: 200,
    description: 'Ramo de atividade',
    type: ActivityResponse,
  })
  findOne(@Param() params: FindByIdDto) {
    return this.activitiesService.findOne(+params.id);
  }

  @ApiOperation({
    summary: 'Rota para editar um ramo de atividades - Exclusivo admin',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Ramo de atividade editado',
    type: ActivityResponse,
  })
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
