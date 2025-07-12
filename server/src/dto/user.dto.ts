import { IsEmail, IsString, IsOptional, IsArray, IsEnum, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  offeredSkills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  wantedSkills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  availability?: string[];
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  offeredSkills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  wantedSkills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  availability?: string[];
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
} 