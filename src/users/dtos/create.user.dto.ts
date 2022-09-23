import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({message: 'Email should not be empty'})
  @IsString({message: 'should be string'})
  @IsEmail({}, {message: 'incorrect email'})
  readonly email: string;

  @IsNotEmpty({message: 'Password should not be empty'})
  @IsString({message: 'should be string'})
  readonly password: string;
}