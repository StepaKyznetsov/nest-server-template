import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create.user.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() createUserDto: CreateUserDto): Promise<object> {
    return this.authService.login(createUserDto);
  };

  @Post('/registration')
  registration(@Body() createUserDto: CreateUserDto): Promise<object> {
    return this.authService.registration(createUserDto);
  };
}