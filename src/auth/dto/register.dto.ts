import { IsEmail, IsString, Min, MinLength } from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsEmail()
  email: string;
}
