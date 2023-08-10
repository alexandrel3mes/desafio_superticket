import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './api-response/login.response';
import { RegisterResponse } from './api-response/register.response';

@ApiTags('Usuário')
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Rota de cadastro' })
  @ApiResponse({ status: 400, description: 'Dados já utilizados.' })
  @ApiResponse({
    status: 201,
    description: 'Cadastro aceito',
    type: RegisterResponse,
  })
  async register(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.authService.signup(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Rota de login.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 200,
    description: 'Login aceito',
    type: LoginResponse,
  })
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.validateUser(signInDto.email, signInDto.password);
  }
}
