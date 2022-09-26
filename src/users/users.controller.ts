import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../utils/sequelize';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<UserDto[]> {
    return this.usersService.getAllUsers();
  };

  @Put('/:email')
  updateUserData(@Param('email') email: string, password: string): Promise<User> {
    return this.usersService.updateUserData(email, password);
  };

  @Delete('/:email')
  deleteUser(@Param('email') email: string): Promise<string> {
    return this.usersService.deleteUser(email);
  };
}
