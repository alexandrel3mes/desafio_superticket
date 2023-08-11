import { Controller, Get, Body, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MeResponse } from './api-response/register.response';

@ApiTags('Usuário')
@ApiBearerAuth()
@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Rota para visualizar suas informações de usuário' })
  @Get('me')
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário',
    type: MeResponse,
  })
  me(@Req() req: any) {
    return this.usersService.findOne(req.user);
  }

  @Patch('edit_me')
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user, updateUserDto);
  }
}
