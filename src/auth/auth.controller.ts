import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { instanceToPlain } from 'class-transformer';
import { CreateUserDto } from '../users/dtos/create.user.dto';
import { LocalAuthGuard } from './utils/guards';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService,
              private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req): any {
    return req.user;
  }

  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto): Promise<any> {
    return instanceToPlain(await this.usersService.createUser(createUserDto))
  };
}