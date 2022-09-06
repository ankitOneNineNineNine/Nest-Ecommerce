import { IsString, Length, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(3)
  fullname: string;

  @IsString()
  address: string;

  @IsString()
  country: string;

  @IsString()
  @Length(10)
  phone: string;
}
