import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly id: number;
}