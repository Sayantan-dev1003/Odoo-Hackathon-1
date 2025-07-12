import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { SwapStatus } from '../schemas/swap.schema';

export class CreateSwapDto {
  @IsString()
  providerId: string;

  @IsString()
  requestedSkill: string;

  @IsString()
  offeredSkill: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsDateString()
  scheduledDate?: string;
}

export class UpdateSwapDto {
  @IsOptional()
  @IsEnum(SwapStatus)
  status?: SwapStatus;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsDateString()
  scheduledDate?: string;
} 