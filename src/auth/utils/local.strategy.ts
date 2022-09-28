import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CreateUserDto } from '../../users/dtos/create.user.dto';
import { User } from '../../utils/sequelize';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.validateUser(createUserDto)
  }
}