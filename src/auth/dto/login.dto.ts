import { IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  username?: string;

  @IsString()
  email?: string;

  @IsString()
  password: string;
}
