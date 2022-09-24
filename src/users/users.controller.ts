import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from '../utils/sequelize';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this. usersService.createUser(userDto)
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers()
  }

  @Get('/:email')
  getUserByEmail(@Param() email: string): Promise<User | null> {
    return this.usersService.getUserByEmail(email)
  }





}
