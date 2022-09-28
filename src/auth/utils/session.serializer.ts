import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { CreateUserDto } from '../../users/dtos/create.user.dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(createUserDto: CreateUserDto, done: Function) {
    done(null, createUserDto);
  }

  async deserializeUser(createUserDto: CreateUserDto, done: Function) {
    const userInDb = await this.usersService.getUserByEmail(createUserDto.email);
    return userInDb ? done(null, userInDb) : done(null, null);
  }
}