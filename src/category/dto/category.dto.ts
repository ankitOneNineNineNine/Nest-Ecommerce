import { IsString, MinLength } from 'class-validator';

export class CategoryDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  description: string;
}
